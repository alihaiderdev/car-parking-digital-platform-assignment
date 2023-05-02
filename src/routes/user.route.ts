import express, { Router } from 'express';
import { checkUserLoggedIn, validateRequest } from '../middlewares';
import { deleteUserHandler, getUserHandler, getUsersHandler } from '../controllers/user.controller';
import { deleteUserSchema } from '../schemas/user.schema';

const userRouter: Router = express.Router();

userRouter.get('/', getUsersHandler);
userRouter.get('/:userId', getUserHandler);
userRouter.delete('/:userId', [checkUserLoggedIn, validateRequest(deleteUserSchema)], deleteUserHandler);

export { userRouter };
