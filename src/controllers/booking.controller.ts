import { Request, Response } from 'express';
import { createBooking, deleteBooking, findBooking, findBookings, updateBooking } from '../services/booking.service';

export async function createBookingHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
  try {
    // @ts-ignore
    const payload = { ...req.body, user: req?.user?._doc._id };

    const booking = await createBooking(payload);
    return res.status(201).send({ success: false, error: true, message: 'Parking spot booked successfully!', data: booking });
  } catch (error: any) {
    console.log(`Error: `.red, error);
    return res.status(409).send({ success: false, error: true, message: error.message });
  }
}

export async function getBookingHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
  try {
    const booking = await findBooking({ _id: req.params.bookingId });

    return res.status(200).send({ success: false, error: true, message: 'Successfully fetch booking!', data: booking });
  } catch (error: any) {
    console.log(`Error: `.red, error);
    return res.status(500).send({ success: false, error: true, message: error.message });
  }
}

export async function getBookingsHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
  try {
    let query: any = {};
    if (req.query?.user) {
      query.user = req.query?.user;
    }
    // @ts-ignore
    const bookings = await findBookings({ user: req?.user?._doc._id });

    return res.status(200).send({ success: false, error: true, message: 'Successfully fetch all bookings!', data: bookings });
  } catch (error: any) {
    console.log(`Error: `.red, error);
    return res.status(500).send({ success: false, error: true, message: error.message });
  }
}

export async function updateBookingHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
  try {
    const booking = await updateBooking({ _id: req.params.bookingId }, req.body, { new: true });

    return res.status(200).send({ success: false, error: true, message: 'Booking updated successfully!', data: booking });
  } catch (error: any) {
    console.log(`Error: `.red, error);
    return res.status(409).send({ success: false, error: true, message: error.message });
  }
}

export async function deleteBookingHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
  try {
    await deleteBooking({ _id: req.params.bookingId });

    return res.status(200).send({ success: false, error: true, message: 'Booking deleted successfully!' });
  } catch (error: any) {
    console.log(`Error: `.red, error);
    return res.status(500).send({ success: false, error: true, message: error.message });
  }
}
