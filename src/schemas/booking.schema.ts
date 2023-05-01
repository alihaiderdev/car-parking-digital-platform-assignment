import { object, string } from 'yup';

const payload = {
  body: object({
    // user: string().required('User id is required!'),
    area: string().required('Area id is required!'),
    parking: string().required('Parking id is required!'),
    startTime: string().required('Start time is required!'),
    endTime: string().required('End time is required!'),
  }),
};

const params = {
  params: object({
    bookingId: string().required('Booking id is required!'),
  }),
};

export const createBookingSchema = object({
  ...payload,
});

export const updateBookingSchema = object({
  ...params,
  ...payload,
});

export const deleteBookingSchema = object({
  ...params,
});
