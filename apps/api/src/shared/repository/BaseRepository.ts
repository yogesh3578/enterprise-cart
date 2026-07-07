import {
  FilterQuery,
  HydratedDocument,
  Model,
  QueryOptions,
  SortOrder,
  UpdateQuery,
} from "mongoose";
import { getPagination } from "../utils/pagination";

export abstract class BaseRepository<T> {
  constructor(protected readonly model: Model<T>) { }

  async create(data: Partial<T>): Promise<HydratedDocument<T>> {
    return this.model.create(data);
  }

  async findById(id: string): Promise<HydratedDocument<T> | null> {
    return this.model.findById(id).exec();
  }

  async findOne(
    filter: FilterQuery<T>
  ): Promise<HydratedDocument<T> | null> {
    return this.model.findOne(filter).exec();
  }

  async find(
    filter: FilterQuery<T> = {}
  ): Promise<HydratedDocument<T>[]> {
    return this.model.find(filter).exec();
  }

  async update(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: QueryOptions = { new: true }
  ): Promise<HydratedDocument<T> | null> {
    return this.model.findOneAndUpdate(filter, update, options).exec();
  }

  async softDelete(
    filter: FilterQuery<T>
  ): Promise<HydratedDocument<T> | null> {
    return this.model.findOneAndUpdate(
      filter,
      {
        isDeleted: true,
        deletedAt: new Date(),
      },
      {
        new: true,
      }
    ).exec();
  }

  async findWithPagination(
    filter: FilterQuery<T>,
    page: number,
    limit: number,
    sort?: Record<string, SortOrder>
  ) {
    const { skip } = getPagination(page, limit);

    const data = await this.model
      .find(filter)
      .sort(sort ?? { createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await this.model.countDocuments(filter);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async count(filter: FilterQuery<T> = {}) {
    return this.model.countDocuments(filter);
  }


}