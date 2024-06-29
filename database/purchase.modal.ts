import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IPurchase extends Document {
  userId: string;
  courseId: Schema.Types.ObjectId;
  price: number;
  // course: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PurchaseSchema = new Schema(
  {
    userId: { type: String, required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    price: { type: Number },
    // course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  }
  //  {
  //   indexes: [
  //     { fields: { courseId: 1 } },
  //     { fields: { userId: 1, courseId: 1 }, unique: true },
  //   ],
  // }
);

const Purchase =
  models.Purchase || model<IPurchase>("Purchase", PurchaseSchema);

export default Purchase;
