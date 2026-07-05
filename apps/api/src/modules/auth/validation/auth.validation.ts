import { z } from "zod";

import { Regex } from "../../../shared/constants/regex";

export const registerSchema = z.object({
  body: z.object({
    firstName: z.string().trim().min(2).max(50),

    lastName: z.string().trim().min(2).max(50),

    email: z.string().regex(Regex.EMAIL),

    password: z.string().regex(Regex.PASSWORD),

    phone: z.string().optional(),

    avatar: z.string().optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().regex(Regex.EMAIL),

    password: z.string().min(8),
  }),
});