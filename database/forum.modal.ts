import { Document, Model, Schema, Types, model, models } from "mongoose";
import { IUser } from "./user.modal";

export interface IAnnouncement {
  _id?: Types.ObjectId;
  title: string;
  description: string;
  teacherName?: string;
  teacherUsername?: string;
  teacherPicture?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IForum extends Document {
  title: string;
  teacherId: Types.ObjectId | IUser;
  announcements: IAnnouncement[];
  followers: (Types.ObjectId | IUser)[];
}

const AnnouncementSchema: Schema<IAnnouncement> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    teacherName: { type: String },
    teacherUsername: { type: String },
    teacherPicture: { type: String },
  },
  { timestamps: true },
);

const ForumSchema: Schema<IForum> = new Schema({
  title: { type: String, required: true },
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  announcements: [AnnouncementSchema],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Forum: Model<IForum> = models.Forum || model("Forum", ForumSchema);
export default Forum;
