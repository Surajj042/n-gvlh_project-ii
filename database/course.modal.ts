import mongoose, { Schema, Document, models, model } from "mongoose";

// Define TypeScript interface
export interface ICourse extends Document {
  userId: string;
  title: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  isPublished: boolean;
  categoryId?: Schema.Types.ObjectId;
  category?: Schema.Types.ObjectId;
  attachments: Schema.Types.ObjectId[];
  chapters: Schema.Types.ObjectId[];
  purchases: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// Define Mongoose Schema
const CourseSchema = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  price: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: false },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  attachments: [{ type: Schema.Types.ObjectId, ref: "Attachment" }],
  chapters: [{ type: Schema.Types.ObjectId, ref: "Chapter" }],
  purchases: [{ type: Schema.Types.ObjectId, ref: "Purchase" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Define Course model
const Course = models.Course || model<ICourse>("Course", CourseSchema);

export default Course;
