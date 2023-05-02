import express, { Router, Request, Response, NextFunction } from 'express';
import { checkFieldIsUniqueOrNot, checkUserLoggedIn, validateRequest } from '../middlewares';
import { createAreaSchema, deleteAreaSchema, updateAreaSchema } from '../schemas/area.schema';
import { createAreaHandler, deleteAreaHandler, getAreaHandler, getAreasHandler, updateAreaHandler } from '../controllers/area.controller';
import { Area } from '../models/area.model';

export const areaRouter: Router = express.Router();

areaRouter.post(
  '/',
  [
    checkUserLoggedIn,
    validateRequest(createAreaSchema),
    (req: Request, res: Response, next: NextFunction) => checkFieldIsUniqueOrNot(req, res, next, Area, 'title'),
  ],
  createAreaHandler
);
areaRouter.get('/', checkUserLoggedIn, getAreasHandler);
areaRouter.get('/:areaId', checkUserLoggedIn, getAreaHandler);
areaRouter.patch(
  '/:areaId',
  [
    checkUserLoggedIn,
    validateRequest(updateAreaSchema),
    (req: Request, res: Response, next: NextFunction) => checkFieldIsUniqueOrNot(req, res, next, Area, 'title'),
  ],
  updateAreaHandler
);
areaRouter.delete('/:areaId', [checkUserLoggedIn, validateRequest(deleteAreaSchema)], deleteAreaHandler);
