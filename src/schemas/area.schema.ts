import { object, string } from 'yup';

const payload = {
  body: object({
    title: string().required('Title is required!'),
  }),
};

const params = {
  params: object({
    areaId: string().required('Area id is required!'),
  }),
};

export const createAreaSchema = object({
  ...payload,
});

export const updateAreaSchema = object({
  ...params,
  ...payload,
});

export const deleteAreaSchema = object({
  ...params,
});
