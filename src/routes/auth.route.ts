import express, { Router, Request, Response, NextFunction } from 'express';
import { registerHandler, loginHandler } from '../controllers/auth.controller';
import { checkFieldIsUniqueOrNot, validateRequest } from '../middlewares';
import { loginSchema, registerSchema } from '../schemas/auth.schema';
import { User } from '../models/user.model';

const authRouter: Router = express.Router();

authRouter.post(
  '/register',
  validateRequest(registerSchema),
  (req: Request, res: Response, next: NextFunction) => checkFieldIsUniqueOrNot(req, res, next, User, 'email'),
  registerHandler
);
authRouter.post('/login', validateRequest(loginSchema), loginHandler);

export { authRouter };
