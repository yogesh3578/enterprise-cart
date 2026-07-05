import {
  FilterQuery,
  Model,
  UpdateQuery,
  QueryOptions,
} from "mongoose";

export abstract class BaseRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  async find(filter: FilterQuery<T> = {}): Promise<T[]> {
    return this.model.find(filter).exec();
  }

  async update(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: QueryOptions = { new: true }
  ): Promise<T | null> {
    return this.model.findOneAndUpdate(filter, update, options).exec();
  }

  async delete(filter: FilterQuery<T>): Promise<T | null> {
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
}