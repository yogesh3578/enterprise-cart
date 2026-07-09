import { HydratedDocument } from "mongoose";

import { IProduct } from "../interfaces/product.interface";
import { ProductResponseDto } from "../dto/product-response.dto";



export class ProductMapper {
  static toResponse(
    product: HydratedDocument<IProduct>
  ): ProductResponseDto {
    
    
    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      description: product.description ?? undefined,
      barcode: product.barcode ?? undefined,
      

      // We'll populate category later
      category: product.category.toString(),

      images: product.images,

      costPrice: product.costPrice,
      sellingPrice: product.sellingPrice,

      taxPercentage: product.taxPercentage,
      discountPercentage: product.discountPercentage,

      stock: product.stock,
      lowStockThreshold: product.lowStockThreshold,

      isFeatured: product.isFeatured,
      isActive: product.isActive,

      createdAt: product.createdAt,
    };
  }
}