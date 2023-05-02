import { Request, Response, NextFunction } from 'express';

const checkUserLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const user = req?.user;

  if (!user) {
    return res.status(401).send({ success: false, error: true, message: "Can't access this route, Please login first!" });
  }
  return next();
};

export default checkUserLoggedIn;
