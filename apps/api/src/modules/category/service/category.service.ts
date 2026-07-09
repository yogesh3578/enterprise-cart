import categoryRepository from "../repository/category.repository";

import { CreateCategoryDto } from "../dto/create-category.dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";

import { CategoryMapper } from "../mapper/category.mapper";

import { generateSlug } from "../../../shared/utils/slug";

import { ConflictError } from "../../../shared/errors/ConflictError";
import { NotFoundError } from "../../../shared/errors/NotFoundError";
import { SortOrder } from "mongoose";
import { CATEGORY_SEARCHABLE_FIELDS } from "../constants/category.constants";

class CategoryService {
  async create(dto: CreateCategoryDto) {
    const exists = await categoryRepository.findByName(dto.name);

    if (exists) {
      throw new ConflictError("Category already exists");
    }

    const category = await categoryRepository.create({
      ...dto,
      slug: generateSlug(dto.name),
    });

    return CategoryMapper.toResponse(category);
  }

  async getAll(
    filters: Record<string, unknown>,
    pagination: Record<string, unknown>
  ) {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = pagination;

    const { search, isActive } = filters;

    const mongoFilter: Record<string, unknown> = {
      isDeleted: false,
    };

    if (typeof isActive === "boolean") {
      mongoFilter.isActive = isActive;
    }

    if (typeof search === "string" && search.trim()) {
      mongoFilter.$or = CATEGORY_SEARCHABLE_FIELDS.map((field) => ({
        [field]: {
          $regex: search,
          $options: "i",
        },
      }));
    }

    const sort: Record<string, SortOrder> = {
      [String(sortBy)]: sortOrder === "asc" ? 1 : -1,
    };

    const result = await categoryRepository.findWithPagination(
      mongoFilter,
      Number(page),
      Number(limit),
      sort
    );

    return {
      data: result.data.map(CategoryMapper.toResponse),
      meta: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    };
  }

  async getById(id: string) {
    const category = await categoryRepository.findActiveById(id);

    if (!category) {
      throw new NotFoundError("Category not found");
    }

    return CategoryMapper.toResponse(category);
  }

  async update(
    id: string,
    dto: UpdateCategoryDto
  ) {
    const category = await categoryRepository.findActiveById(id);

    if (!category) {
      throw new NotFoundError("Category not found");
    }

    // Prevent duplicate names
    if (dto.name) {
      const exists = await categoryRepository.findByName(dto.name);

      if (exists && exists.id !== id) {
        throw new ConflictError("Category already exists");
      }
    }

    const updateData: Record<string, unknown> = {
      ...dto,
    };

    if (dto.name) {
      updateData.slug = generateSlug(dto.name);
    }

    const updated = await categoryRepository.update(
      { _id: id },
      updateData
    );

    return CategoryMapper.toResponse(updated!);
  }

  async delete(id: string) {
    const category = await categoryRepository.findActiveById(id);

    if (!category) {
      throw new NotFoundError("Category not found");
    }

    await categoryRepository.softDelete({
      _id: id,
    });
  }

  async getBySlug(slug: string) {
    const category = await categoryRepository.findBySlug(slug);

    if (!category) {
      throw new NotFoundError("Category not found");
    }

    return CategoryMapper.toResponse(category);
  }

  async restore(id: string) {
    const category = await categoryRepository.findById(id);

    if (!category) {
      throw new NotFoundError("Category not found");
    }

    const restored = await categoryRepository.restore({
      _id: id,
    });


    return CategoryMapper.toResponse(restored!);
  }

}

export default new CategoryService();