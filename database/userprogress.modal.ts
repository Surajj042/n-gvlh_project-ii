import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IUserProgress extends Document {
  userId: string;
  chapterId: Schema.Types.ObjectId;
  chapter: Schema.Types.ObjectId;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserProgressSchema = new Schema({
  userId: { type: String, required: true },
  chapterId: { type: Schema.Types.ObjectId, ref: "Chapter", required: true },
  chapter: { type: Schema.Types.ObjectId, ref: "Chapter", required: true },
  isCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, 
// {
//   indexes: [
//     { fields: { chapterId: 1 } },
//     { fields: { userId: 1, chapterId: 1 }, unique: true },
//   ],
// }
);

const UserProgress = models.UserProgress || model<IUserProgress>("UserProgress", UserProgressSchema);

export default UserProgress;
