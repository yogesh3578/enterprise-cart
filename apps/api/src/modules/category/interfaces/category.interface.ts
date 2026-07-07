export interface ICategory {
  name: string;

  slug: string;

  description?: string;

  image?: string;

  isActive: boolean;

  isDeleted: boolean;

  deletedAt?: Date | null;

  createdAt: Date;

  updatedAt: Date;
}