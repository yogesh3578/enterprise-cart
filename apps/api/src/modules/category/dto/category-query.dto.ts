export interface CategoryQueryDto {
  page?: number;
  limit?: number;

  search?: string;

  sortBy?: string;
  sortOrder?: "asc" | "desc";

  isActive?: boolean;
}

