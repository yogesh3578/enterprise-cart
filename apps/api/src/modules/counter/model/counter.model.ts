import mongoose, { Schema } from "mongoose";

import { ICounter } from "../interfaces/counter.interface";

const counterSchema = new Schema<ICounter>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    sequence: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const CounterModel =
  mongoose.models.Counter ||
  mongoose.model<ICounter>("Counter", counterSchema);

export default CounterModel;