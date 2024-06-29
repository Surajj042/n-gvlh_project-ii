import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IAttachment extends Document {
  name: string;
  url: string;
  courseId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AttachmentSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Attachment =
  models.Attachment || model<IAttachment>("Attachment", AttachmentSchema);

export default Attachment;
