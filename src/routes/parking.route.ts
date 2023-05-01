import express, { Router } from 'express';
import { checkUserLoggedIn, validateRequest } from '../middlewares';
import { createParkingSchema, deleteParkingSchema, updateParkingSchema } from '../schemas/parking.schema';
import {
  createParkingHandler,
  deleteParkingHandler,
  getParkingHandler,
  getParkingsHandler,
  updateParkingHandler,
} from '../controllers/parking.controller';

export const parkingRouter: Router = express.Router();

parkingRouter.post('/', [checkUserLoggedIn, validateRequest(createParkingSchema)], createParkingHandler);
parkingRouter.get('/', checkUserLoggedIn, getParkingsHandler);
parkingRouter.get('/:parkingId', checkUserLoggedIn, getParkingHandler);
parkingRouter.patch('/:parkingId', [checkUserLoggedIn, validateRequest(updateParkingSchema)], updateParkingHandler);
parkingRouter.delete('/:parkingId', [checkUserLoggedIn, validateRequest(deleteParkingSchema)], deleteParkingHandler);
