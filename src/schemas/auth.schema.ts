import { object, string } from 'yup';

const payload = {
  password: string()
    .required('Password is required!')
    .min(8, 'Password is too short - should be 8 chars minimum!')
    .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain latin letters!'),
  email: string().required('Email is required!').email('Please enter valid email!'),
};

export const registerSchema = object({
  body: object({
    name: string().required('Name is required!'),
    ...payload,
  }),
});

export const loginSchema = object({
  body: object({
    ...payload,
  }),
});
