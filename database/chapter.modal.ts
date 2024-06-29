import { Document, Schema, model, models } from "mongoose";

export interface IChapter extends Document {
  title: string;
  description?: string;
  videoUrl?: string;
  position: number;
  isPublished: boolean;
  isFree: boolean;
  muxData?: Schema.Types.ObjectId;
  youtubeUrl?: string;
  courseId: Schema.Types.ObjectId;
  // course: Schema.Types.ObjectId;
  userProgress: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ChapterSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String },
  position: { type: Number, required: true },
  isPublished: { type: Boolean, default: false },
  isFree: { type: Boolean, default: false },
  muxData: { type: Schema.Types.ObjectId, ref: "MuxData" },
  youtubeUrl: { type: String },
  courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  // course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  userProgress: [{ type: Schema.Types.ObjectId, ref: "UserProgress" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Chapter = models.Chapter || model<IChapter>("Chapter", ChapterSchema);

export default Chapter;
