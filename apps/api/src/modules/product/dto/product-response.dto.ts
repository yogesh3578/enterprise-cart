export interface ProductResponseDto {
  id: string;

  name: string;

  slug: string;

  sku: string;

  description?: string;

  barcode?: string;

  category: string;

  images: string[];

  costPrice: number;

  sellingPrice: number;

  taxPercentage: number;

  discountPercentage: number;

  stock: number;

  lowStockThreshold: number;

  isFeatured: boolean;

  isActive: boolean;

  createdAt: Date;
}