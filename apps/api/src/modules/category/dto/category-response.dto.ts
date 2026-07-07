export interface CategoryResponseDto {
  id: string;

  name: string;

  slug: string;

  description?: string;

  image?: string;

  isActive: boolean;

  createdAt: Date;
}