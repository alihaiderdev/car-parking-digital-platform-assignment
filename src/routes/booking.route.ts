import express, { Router } from 'express';
import { checkUserLoggedIn, validateRequest } from '../middlewares';
import { createBookingSchema, deleteBookingSchema, updateBookingSchema } from '../schemas/booking.schema';
import {
  createBookingHandler,
  getBookingHandler,
  getBookingsHandler,
  deleteBookingHandler,
  updateBookingHandler,
} from '../controllers/booking.controller';

export const bookingRouter: Router = express.Router();

bookingRouter.post('/', [checkUserLoggedIn, validateRequest(createBookingSchema)], createBookingHandler);
bookingRouter.get('/', checkUserLoggedIn, getBookingsHandler);
bookingRouter.get('/:bookingId', checkUserLoggedIn, getBookingHandler);
bookingRouter.patch('/:bookingId', [checkUserLoggedIn, validateRequest(updateBookingSchema)], updateBookingHandler);
bookingRouter.delete('/:bookingId', [checkUserLoggedIn, validateRequest(deleteBookingSchema)], deleteBookingHandler);
