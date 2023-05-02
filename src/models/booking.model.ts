import { Schema, model, Document } from 'mongoose';
import { AreaDocument } from './area.model';
import { UserDocument } from './user.model';
import { ParkingDocument } from './parking.model';

export interface BookingInput {
  user: UserDocument['_id'];
  area: AreaDocument['_id'];
  parking: ParkingDocument['_id'];
  startTime: Date;
  endTime: Date;
}

export interface BookingDocument extends BookingInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<BookingDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'User id is required!'], select: false },
    area: { type: Schema.Types.ObjectId, ref: 'Area', required: [true, 'Area id is required!'] },
    parking: { type: Schema.Types.ObjectId, ref: 'Parking', required: [true, 'Parking id is required!'] },
    startTime: { type: Date, required: [true, 'Start time is required!'] },
    endTime: { type: Date, required: [true, 'End time is required!'] },
  },
  { timestamps: true, versionKey: false }
);

BookingSchema.pre(/^find/, function (this: UserDocument, next) {
  this.populate('area', 'title');
  next();
});

BookingSchema.pre(/^find/, function (this: UserDocument, next) {
  this.populate('parking', 'title isBooked order position');
  next();
});

export const Booking = model<BookingDocument>('Booking', BookingSchema);
