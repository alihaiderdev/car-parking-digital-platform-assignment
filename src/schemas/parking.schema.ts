import { object, string, boolean, number } from 'yup';

const payload = {
  body: object({
    area: string().required('Area id is required!'),
    title: string().required('Title is required!'),
    order: number().required('Order is required!'),
    isBooked: boolean(),
    position: object({ rowStart: number(), rowEnd: number(), columnStart: number(), columnEnd: number() }),
  }),
};

const params = {
  params: object({
    parkingId: string().required('Parking id is required!'),
  }),
};

export const createParkingSchema = object({
  ...payload,
});

export const updateParkingSchema = object({
  ...params,
  ...payload,
});

export const deleteParkingSchema = object({
  ...params,
});
