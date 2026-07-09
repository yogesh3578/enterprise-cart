import mongoose, { Schema } from "mongoose";

import { ICategory } from "../interfaces/category.interface";

import {
    baseSchemaFields,
} from "../../../core/database/base.schema";

const categorySchema = new Schema<ICategory>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        description: {
            type: String,
            default: null,
        },

        image: {
            type: String,
            default: null,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        ...baseSchemaFields,
    },
    {
        timestamps: true,
        versionKey: false,
    },
);


categorySchema.index({
    isDeleted: 1,
});

export const CategoryModel =
    mongoose.models.Category ||
    mongoose.model<ICategory>("Category", categorySchema);

export default CategoryModel;