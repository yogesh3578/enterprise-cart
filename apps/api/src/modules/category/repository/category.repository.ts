import { BaseRepository } from "../../../shared/repository/BaseRepository";

import { ICategory } from "../interfaces/category.interface";
import CategoryModel from "../model/category.model";

class CategoryRepository extends BaseRepository<ICategory> {
    constructor() {
        super(CategoryModel);
    }

    async findByName(name: string) {
        return this.findOne({
            name,
            isDeleted: false,
        });
    }

    async findBySlug(slug: string) {
        return this.findOne({
            slug,
            isDeleted: false,
        });
    }

    async findActiveById(id: string) {
        return this.findOne({
            _id: id,
            isDeleted: false,
        });
    }

    async restore(id: string) {
        return this.model.findByIdAndUpdate(
            id,
            {
                isDeleted: false,
                deletedAt: null,
            },
            {
                new: true,
            }
        );
    }

}

export default new CategoryRepository();