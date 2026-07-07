import { HydratedDocument } from "mongoose";

import { ICategory } from "../interfaces/category.interface";
import { CategoryResponseDto } from "../dto/category-response.dto";

export class CategoryMapper {
  static toResponse(
    category: HydratedDocument<ICategory>
  ): CategoryResponseDto {
    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description ?? undefined,
      image: category.image ?? undefined,
      isActive: category.isActive,
      createdAt: category.createdAt,
    };
  }
}