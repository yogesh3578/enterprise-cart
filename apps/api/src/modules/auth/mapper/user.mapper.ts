import { HydratedDocument } from "mongoose";

import { IUser } from "../interfaces/user.interface";
import { UserResponseDto } from "../dto/user-response.dto";

export class UserMapper {
  static toResponse(
    user: HydratedDocument<IUser>
  ): UserResponseDto {
    return {
      id: user.id, // Mongoose virtual getter
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone ?? undefined,
      avatar: user.avatar ?? undefined,
      role: user.role,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    };
  }
}