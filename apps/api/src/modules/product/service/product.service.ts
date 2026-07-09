import { SortOrder, Types } from "mongoose";

import { CreateProductDto } from "../dto/create-product.dto";
import { ProductMapper } from "../mapper/product.mapper";

import productRepository from "../repository/product.repository";
import categoryRepository from "../../category/repository/category.repository";
import sequenceService from "../../counter/service/sequence.service";

import { BadRequestError } from "../../../shared/errors/BadRequestError";
import { ConflictError } from "../../../shared/errors/ConflictError";
import { NotFoundError } from "../../../shared/errors/NotFoundError";
import { ProductQueryDto } from "../dto/product-query.dto";
import { PRODUCT_SEARCHABLE_FIELDS } from "../constants/product.constants";
import { UpdateProductDto } from "../dto/update-product.dto";
import { IProduct } from "../interfaces/product.interface";


class ProductService {
    async create(dto: CreateProductDto) {
        const category = await categoryRepository.findActiveById(dto.category);

        if (!category) {
            throw new NotFoundError("Category not found");
        }

        const existingProduct = await productRepository.findByName(dto.name);

        if (existingProduct) {
            throw new ConflictError("Product already exists");
        }

        if (dto.sellingPrice < dto.costPrice) {
            throw new BadRequestError(
                "Selling price cannot be less than cost price"
            );
        }

        const sku = await sequenceService.generateProductSku(dto.name);

        const product = await productRepository.create({
            name: dto.name,
            description: dto.description,
            sku,
            barcode: dto.barcode,
            category: new Types.ObjectId(dto.category),
            images: dto.images ?? [],
            costPrice: dto.costPrice,
            sellingPrice: dto.sellingPrice,
            taxPercentage: dto.taxPercentage ?? 0,
            discountPercentage: dto.discountPercentage ?? 0,
            stock: dto.stock ?? 0,
            lowStockThreshold: dto.lowStockThreshold ?? 5,
            isFeatured: dto.isFeatured ?? false,
            isActive: dto.isActive ?? true,
        });

        return ProductMapper.toResponse(product);
    }

    async getAll(query: ProductQueryDto) {
        const page = Number(query.page) || 1;

        const limit = Number(query.limit) || 10;
        const filter: Record<string, unknown> = {
            isDeleted: false,
        };
        if (query.search) {
            filter.$or = PRODUCT_SEARCHABLE_FIELDS.map((field) => ({
                [field]: {
                    $regex: query.search,
                    $options: "i",
                },
            }));
        }
        if (query.category) {
            filter.category = query.category;
        }
        if (query.isFeatured !== undefined) {
            filter.isFeatured = query.isFeatured;
        }
        if (query.isActive !== undefined) {
            filter.isActive = query.isActive;
        }
        const sort: Record<string, SortOrder> = {
            [query.sortBy ?? "createdAt"]:
                query.sortOrder === "asc" ? 1 : -1,
        };
        const result =
            await productRepository.findWithPagination(
                filter,
                page,
                limit,
                sort
            );
        const data = result.data.map(ProductMapper.toResponse);
        return {
            data,
            meta: {
                page: result.page,
                limit: result.limit,
                total: result.total,
                totalPages: result.totalPages,
            },
        };

    }

    async getById(id: string) {
        const product = await productRepository.findByIdWithCategory(id);

        if (!product) {
            throw new NotFoundError("Product not found");
        }

        return {
            ...ProductMapper.toResponse(product as any),
            category: {
                id: (product.category as any)._id,
                name: (product.category as any).name,
                slug: (product.category as any).slug,
            },
        };
    }

    async update(id: string, dto: UpdateProductDto) {
        const existingProduct = await productRepository.findActiveById(id);

        if (!existingProduct) {
            throw new NotFoundError("Product not found");
        }

        // Validate category if changing
        if (dto.category) {
            const category = await categoryRepository.findActiveById(dto.category);

            if (!category) {
                throw new NotFoundError("Category not found");
            }
        }

        // Prevent duplicate product names
        if (
            dto.name &&
            dto.name.toLowerCase() !== existingProduct.name.toLowerCase()
        ) {
            const duplicate = await productRepository.findByName(dto.name);

            if (duplicate) {
                throw new ConflictError("Product already exists");
            }
        }

        // Price validation
        const costPrice =
            dto.costPrice ?? existingProduct.costPrice;

        const sellingPrice =
            dto.sellingPrice ?? existingProduct.sellingPrice;

        if (sellingPrice < costPrice) {
            throw new BadRequestError(
                "Selling price cannot be less than cost price"
            );
        }

        const updateData: Partial<IProduct> = {};

        if (dto.name !== undefined) updateData.name = dto.name;
        if (dto.description !== undefined) updateData.description = dto.description;
        if (dto.images !== undefined) updateData.images = dto.images;
        if (dto.costPrice !== undefined) updateData.costPrice = dto.costPrice;
        if (dto.sellingPrice !== undefined) updateData.sellingPrice = dto.sellingPrice;
        if (dto.barcode !== undefined) updateData.barcode = dto.barcode;
        if (dto.taxPercentage !== undefined) updateData.taxPercentage = dto.taxPercentage;
        if (dto.discountPercentage !== undefined)
            updateData.discountPercentage = dto.discountPercentage;
        if (dto.stock !== undefined) updateData.stock = dto.stock;
        if (dto.lowStockThreshold !== undefined)
            updateData.lowStockThreshold = dto.lowStockThreshold;
        if (dto.isFeatured !== undefined)
            updateData.isFeatured = dto.isFeatured;
        if (dto.isActive !== undefined)
            updateData.isActive = dto.isActive;

        if (dto.category) {
            updateData.category = new Types.ObjectId(dto.category);
        }
        const updatedProduct = await productRepository.updateById(
            id,
            updateData
        );

        if (!updatedProduct) {
            throw new NotFoundError("Product not found");
        }

        return ProductMapper.toResponse(updatedProduct);
    }

    async delete(id: string) {
        const product = await productRepository.findActiveById(id);

        if (!product) {
            throw new NotFoundError("Product not found");
        }

        await productRepository.softDelete({
            _id: product.id,
        });

        return;
    }

    async restore(id: string) {
        const product = await productRepository.findById(id);

        if (!product) {
            throw new NotFoundError("Product not found");
        }

        if (!product.isDeleted) {
            throw new BadRequestError("Product is already active");
        }

        const restored = await productRepository.restore({
            _id: id,
        });

        return ProductMapper.toResponse(restored!);
    }

}

export default new ProductService();