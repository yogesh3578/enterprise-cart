import { Role } from "../../../shared/constants/roles";

export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  role?: Role;
}