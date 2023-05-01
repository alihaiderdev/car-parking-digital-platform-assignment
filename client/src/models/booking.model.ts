import { Area } from './area.model';
import { IData, ITimestamp } from './index.model';
import { Parking } from './parking.model';

export interface IBookings extends IData {
  data?: Booking[];
}

export interface IBooking extends IData {
  data?: Booking;
}

export interface Booking extends ITimestamp {
  _id?: string;
  area?: Omit<Area, 'createdAt' | 'updatedAt'>;
  parking?: Omit<Parking, 'position' | 'createdAt' | 'updatedAt'>;
  startTime: string;
  endTime: string;
}
