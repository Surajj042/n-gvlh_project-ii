import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IMuxData extends Document {
  assetId: string;
  playbackId?: string;
  chapterId: Schema.Types.ObjectId;
  // chapter: Schema.Types.ObjectId;
}

const MuxDataSchema = new Schema({
  assetId: { type: String, required: true },
  playbackId: { type: String },
  chapterId: {
    type: Schema.Types.ObjectId,
    ref: "Chapter",
    unique: true,
    required: true,
  },
  // chapter: { type: Schema.Types.ObjectId, ref: "Chapter", required: true },
});

const MuxData = models.MuxData || model<IMuxData>("MuxData", MuxDataSchema);

export default MuxData;
