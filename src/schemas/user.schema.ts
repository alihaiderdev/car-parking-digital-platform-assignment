import { object, string } from 'yup';

const params = {
  params: object({
    userId: string().required('User id is required!'),
  }),
};

export const deleteUserSchema = object({
  ...params,
});
