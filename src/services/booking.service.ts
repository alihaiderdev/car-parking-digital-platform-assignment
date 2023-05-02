import { FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import { BookingDocument, Booking } from '../models/booking.model';
import { updateParking } from './parking.service';

export async function createBooking(input: BookingDocument) {
  try {
    const booking = await Booking.create(input);

    if (booking) {
      const parking = await updateParking({ _id: input.parking }, { isBooked: true }, { new: true });
      console.log({ booking, parking });
      return booking;
    }
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findBooking(query: FilterQuery<BookingDocument> = {}, options: QueryOptions = {}) {
  try {
    return await Booking.findOne(query, {}, options).lean();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findBookings(query: FilterQuery<BookingDocument> = {}, options: QueryOptions = {}) {
  try {
    return await Booking.find(query, {}, options).lean();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function updateBooking(query: FilterQuery<BookingDocument> = {}, update: UpdateQuery<BookingDocument> = {}, options: QueryOptions = {}) {
  try {
    return await Booking.findOneAndUpdate(query, update, options);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteBooking(query: FilterQuery<BookingDocument> = {}) {
  try {
    return await Booking.deleteOne(query);
  } catch (error: any) {
    throw new Error(error);
  }
}
