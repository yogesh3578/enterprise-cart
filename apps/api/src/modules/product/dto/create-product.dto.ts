export interface CreateProductDto {
  name: string;

  description?: string;

  category: string;

  images?: string[];

  costPrice: number;

  sellingPrice: number;

  barcode?: string;

  taxPercentage?: number;

  discountPercentage?: number;

  stock?: number;

  lowStockThreshold?: number;

  isFeatured?: boolean;

  isActive?: boolean;
}