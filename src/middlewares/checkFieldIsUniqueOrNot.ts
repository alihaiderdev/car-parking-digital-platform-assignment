import { NextFunction, Request, Response } from 'express';

const checkFieldIsUniqueOrNot = async (req: Request, res: Response, next: NextFunction, model: any, field: string, errorTitle?: string) => {
  field = errorTitle || field;
  try {
    if (field in req.body) {
      const isRecordExist = await model.findOne({ [field]: req.body[field] });

      if (isRecordExist) {
        throw new Error(`This ${field} is already taken, Please try with different ${field}!`);
      }
    }
    return next();
  } catch (error: any) {
    console.log(`Error: `.red, error);
    return res.status(409).json({ success: false, error: true, message: error.message });
  }
};

export default checkFieldIsUniqueOrNot;
