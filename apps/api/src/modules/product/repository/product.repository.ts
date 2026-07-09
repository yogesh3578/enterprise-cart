import ProductModel from "../model/product.model";
import { IProduct } from "../interfaces/product.interface";

import { BaseRepository } from "../../../shared/repository/BaseRepository";

class ProductRepository extends BaseRepository<IProduct> {
    constructor() {
        super(ProductModel);
    }

    async findBySlug(slug: string) {
        return this.findOne({
            slug,
            isDeleted: false,
        });
    }

    async findBySku(sku: string) {
        return this.findOne({
            sku,
            isDeleted: false,
        });
    }

    async findActiveById(id: string) {
        return this.findOne({
            _id: id,
            isDeleted: false,
        });
    }

    async findByName(name: string) {
        return this.model.findOne({
            name,
            isDeleted: false,
        });
    }

    async findByIdWithCategory(id: string) {
        return this.model
            .findOne({
                _id: id,
                isDeleted: false,
            })
            .populate("category")
            .exec();
    }

    async updateById(id: string, update: Partial<IProduct>) {
        return this.model.findOneAndUpdate(
            {
                _id: id,
                isDeleted: false,
            },
            update,
            {
                new: true,
                runValidators: true,
            }
        );
    }
}

export default new ProductRepository();