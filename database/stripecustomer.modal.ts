import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IStripeCustomer extends Document {
  userId: string;
  stripeCustomerId: string;
  createdAt: Date;
  updatedAt: Date;
}

const StripeCustomerSchema = new Schema({
  userId: { type: String, unique: true, required: true },
  stripeCustomerId: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const StripeCustomer = models.StripeCustomer || model<IStripeCustomer>("StripeCustomer", StripeCustomerSchema);

export default StripeCustomer;
