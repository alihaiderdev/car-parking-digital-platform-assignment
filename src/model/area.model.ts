import mongoose, { Document } from 'mongoose';

export interface AreaInput {
  title: string;
}

export interface AreaDocument extends AreaInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const AreaSchema = new mongoose.Schema<AreaDocument>(
  {
    title: { type: String, required: [true, 'Title is required!'], unique: true },
  },
  { timestamps: true, versionKey: false }
);

export const Area = mongoose.model<AreaDocument>('Area', AreaSchema);
