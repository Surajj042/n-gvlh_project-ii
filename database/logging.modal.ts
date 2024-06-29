import mongoose, { Schema, Document, models, model } from "mongoose";

export interface ILogging extends Document {
  url: string;
  method: string;
  body?: string;
  response?: string;
  statusCode?: number;
  errorMessage?: string;
  createdAt: Date;
}

const LoggingSchema = new Schema({
  url: { type: String, required: true },
  method: { type: String, required: true },
  body: { type: String },
  response: { type: String },
  statusCode: { type: Number },
  errorMessage: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Logging = models.Logging || model<ILogging>("Logging", LoggingSchema);

export default Logging;
