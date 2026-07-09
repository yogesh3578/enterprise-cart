
export interface ProductQueryDto {
  search?: string;

  category?: string;

  isFeatured?: boolean;

  isActive?: boolean;

  page?: number;

  limit?: number;

  sortBy?: string;

  sortOrder?: "asc" | "desc";
}