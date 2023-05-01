import { AnySchema } from 'yup';
import { Request, Response, NextFunction } from 'express';

const validateRequest = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate(
      {
        body: req.body,
        query: req.query,
        params: req.params,
      },
      { abortEarly: false }
    );
    return next();
  } catch (error: any) {
    console.log(error);
    return res.status(400).send({ success: false, error: true, message: error.errors });
  }
};

export default validateRequest;
