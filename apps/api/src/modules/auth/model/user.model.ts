import mongoose, { Schema } from "mongoose";

import { IUser } from "../interfaces/user.interface";
import { Role } from "../../../shared/constants/roles";

import {
  baseSchemaFields,
} from "../../../core/database/base.schema";

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
    },

    phone: {
      type: String,
      default: null,
    },

    avatar: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.CUSTOMER,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    refreshToken: {
      type: String,
      default: null,
    },

    ...baseSchemaFields,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


export default mongoose.models.User ||
  mongoose.model<IUser>("User", userSchema);