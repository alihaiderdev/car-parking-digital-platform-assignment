import { Response } from 'express';

export const sendResponse = ({
  success,
  res,
  code,
  message,
  data,
}: {
  success: boolean;
  res: Response;
  code?: number;
  message: string;
  data?: any;
}): Response<any, Record<string, any>> => {
  if (success) {
    return res.status(code || 200).send({ success: true, error: false, message, data });
  } else {
    return res.status(code || 500).send({ success: false, error: true, message });
  }
};
