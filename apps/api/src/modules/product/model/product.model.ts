import mongoose, { Schema } from "mongoose";
import slugify from "slugify";
import { IProduct } from "../interfaces/product.interface";
import { baseSchemaFields } from "../../../core/database/base.schema";

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
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

    sku: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    barcode: {
      type: String,
      default: null,
      unique: true,
      sparse: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    images: {
      type: [String],
      default: [],
    },

    costPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    sellingPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    taxPercentage: {
      type: Number,
      default: 0,
      min: 0,
    },

    discountPercentage: {
      type: Number,
      default: 0,
      min: 0,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    lowStockThreshold: {
      type: Number,
      default: 5,
      min: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
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
  }
);

productSchema.pre("validate", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
      trim: true,
    });
  }

  next();
});


productSchema.index({ category: 1 });

productSchema.index({ isActive: 1 });

productSchema.index({ isFeatured: 1 });

productSchema.index({ isDeleted: 1 });

productSchema.index({
  name: "text",
  description: "text",
});

const ProductModel =
  mongoose.models.Product ||
  mongoose.model<IProduct>("Product", productSchema);

export default ProductModel;