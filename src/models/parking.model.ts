import { Schema, model, Document } from 'mongoose';
import { AreaDocument } from './area.model';

export interface IPosition {
  rowStart: Number;
  rowEnd: Number;
  columnStart: Number;
  columnEnd: Number;
}
export interface ParkingInput {
  area: AreaDocument['_id'];
  title: string;
  isBooked: boolean;
  position: IPosition;
  order: Number;
}

export interface ParkingDocument extends ParkingInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const ParkingSchema = new Schema<ParkingDocument>(
  {
    area: { type: Schema.Types.ObjectId, ref: 'Area', required: [true, 'Area id is required!'] },
    title: { type: String, required: [true, 'Title is required!'], trim: true },
    isBooked: { type: Boolean, default: false },
    position: {
      rowStart: Number,
      rowEnd: Number,
      columnStart: Number,
      columnEnd: Number,
    },
    //   "position": {
    //     "rowStart": 1,
    //     "rowEnd": 2,
    //     "columnStart": 1,
    //     "columnEnd": 2
    // }
    order: { type: Number, required: [true, 'Order is required!'] },
  },
  { timestamps: true, versionKey: false }
);

export const Parking = model<ParkingDocument>('Parking', ParkingSchema);
