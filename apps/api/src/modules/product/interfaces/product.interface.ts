import { Types } from "mongoose";

export interface IProduct {
  name: string;

  slug: string;

  description?: string;

  sku: string;

  barcode?: string;

  category: Types.ObjectId;

  images: string[];

  costPrice: number;

  sellingPrice: number;

  taxPercentage: number;

  discountPercentage: number;

  stock: number;

  lowStockThreshold: number;

  isFeatured: boolean;

  isActive: boolean;

  isDeleted: boolean;

  deletedAt?: Date | null;

  createdAt: Date;

  updatedAt: Date;
}