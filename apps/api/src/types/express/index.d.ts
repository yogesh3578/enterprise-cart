import { AuthenticatedUser } from "../../shared/interfaces/AuthenticatedUser";

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export {};