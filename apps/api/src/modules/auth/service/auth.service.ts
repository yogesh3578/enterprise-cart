import authRepository from "../repository/auth.repository";

import { RegisterDto } from "../dto/register.dto";

import { AppError } from "../../../shared/errors/AppError";
import { ErrorCode } from "../../../shared/errors/ErrorCode";
import { HttpStatus } from "../../../shared/constants/httpStatus";
import { Messages } from "../../../shared/constants/messages";

import { hashPassword } from "../../../shared/utils/hashPassword";
import { UserMapper } from "../mapper/user.mapper";

import { comparePassword } from "../../../shared/utils/comparePassword";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../../shared/utils/jwt";
import { UnauthorizedError } from "../../../shared/errors/UnauthorizedError";
import { LoginDto } from "../dto/login.dto";
import { JwtPayload } from "@/shared/interfaces/JwtPayload";
import { NotFoundError } from "@/shared/errors/NotFoundError";


class AuthService {
  async register(data: RegisterDto) {
    const existingUser = await authRepository.findByEmail(data.email);

    if (existingUser) {
      throw new AppError(
        HttpStatus.CONFLICT,
        ErrorCode.CONFLICT,
        Messages.USER.ALREADY_EXISTS
      );
    }

    const hashedPassword = await hashPassword(data.password);
    const user = await authRepository.create({
      ...data,
      password: hashedPassword,
    });

    return UserMapper.toResponse(user);
  }

  async login(dto: LoginDto) {
    const user = await authRepository.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const isPasswordValid = await comparePassword(
      dto.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid email or password");
    }
    const payload = {
      userId: user.id,
      role: user.role,
    };
    const accessToken = generateAccessToken(payload);

    const refreshToken = generateRefreshToken(payload);

    await authRepository.update(
      { _id: user._id },
      {
        refreshToken,
      }
    );

    return {
      accessToken,
      refreshToken,
      user: UserMapper.toResponse(user),
    };
  }


  async refresh(
    refreshToken: string | undefined
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    if (!refreshToken) {
      throw new UnauthorizedError("Refresh token missing");
    }

    let payload: JwtPayload;

    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw new UnauthorizedError("Invalid or expired refresh token");
    }

    const user = await authRepository.findByRefreshToken(refreshToken);

    if (!user) {
      throw new UnauthorizedError("Invalid refresh token");
    }

    // Optional security check
    if (user.id !== payload.userId) {
      throw new UnauthorizedError("Invalid refresh token");
    }

    const newPayload: JwtPayload = {
      userId: user.id,
      role: user.role,
    };

    const accessToken = generateAccessToken(newPayload);

    const newRefreshToken = generateRefreshToken(newPayload);

    await authRepository.updateRefreshToken(
      user.id,
      newRefreshToken
    );

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  async logout(refreshToken: string | undefined): Promise<void> {
    if (!refreshToken) {
      return;
    }

    const user = await authRepository.findByRefreshToken(refreshToken);

    if (!user) {
      return;
    }

    await authRepository.clearRefreshToken(user.id);
  }

  async me(userId: string) {
  const user =
    await authRepository.findActiveUserById(
      userId
    );

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return UserMapper.toResponse(user);
}

}

export default new AuthService();