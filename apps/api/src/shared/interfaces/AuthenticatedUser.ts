import { Role } from "../constants/roles";

export interface AuthenticatedUser {
  id: string;
  role: Role;
}