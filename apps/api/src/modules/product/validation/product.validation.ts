import { z } from "zod";

import { Regex } from "../../../shared/constants/regex";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(100),

    description: z.string().optional(),

    category: z.string().regex(Regex.OBJECT_ID),

    images: z.array(z.string().url()).default([]),

    costPrice: z.number().nonnegative(),

    sellingPrice: z.number().nonnegative(),

    barcode: z.string().optional(),

    taxPercentage: z.number().min(0).max(100).default(0),

    discountPercentage: z.number().min(0).max(100).default(0),

    stock: z.number().int().nonnegative().default(0),

    lowStockThreshold: z.number().int().nonnegative().default(5),

    isFeatured: z.boolean().default(false),

    isActive: z.boolean().default(true),
  }),
});


export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(100).optional(),

    description: z.string().optional(),

    category: z.string().regex(Regex.OBJECT_ID).optional(),

    images: z.array(z.string().url()).optional(),

    costPrice: z.number().nonnegative().optional(),

    sellingPrice: z.number().nonnegative().optional(),

    barcode: z.string().optional(),

    taxPercentage: z.number().min(0).max(100).optional(),

    discountPercentage: z.number().min(0).max(100).optional(),

    stock: z.number().int().nonnegative().optional(),

    lowStockThreshold: z.number().int().nonnegative().optional(),

    isFeatured: z.boolean().optional(),

    isActive: z.boolean().optional(),
  }),
});