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
}

export default new AuthRepository();