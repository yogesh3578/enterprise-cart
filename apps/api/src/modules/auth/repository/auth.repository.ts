import UserModel from "../model/user.model";
import { IUser } from "../interfaces/user.interface";

import { BaseRepository } from "../../../shared/repository/BaseRepository";

class AuthRepository extends BaseRepository<IUser> {
  constructor() {
    super(UserModel);
  }

  async findByEmail(email: string) {
    return this.findOne({ email });
  }

  async findByRefreshToken(refreshToken: string) {
    return this.findOne({ refreshToken });
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string
  ) {
    return this.model.findByIdAndUpdate(
      userId,
      { refreshToken },
      { new: true }
    ).exec();;
  }

  async clearRefreshToken(userId: string) {
    return this.model.findByIdAndUpdate(
      userId,
      {
        refreshToken: null,
      },
      { new: true }
    ).exec();;
  }

  async findActiveUserById(userId: string) {
    return this.findOne({
      _id: userId,
      isDeleted: false,
    });
  }

}

export default new AuthRepository();