import authRepository from "../repository/auth.repository";

import { RegisterDto } from "../dto/register.dto";

import { AppError } from "../../../shared/errors/AppError";
import { ErrorCode } from "../../../shared/errors/ErrorCode";
import { HttpStatus } from "../../../shared/constants/httpStatus";
import { Messages } from "../../../shared/constants/messages";

import { hashPassword } from "../../../shared/utils/hashPassword";

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

    return authRepository.create({
      ...data,
      password: hashedPassword,
    });
  }
}

export default new AuthService();