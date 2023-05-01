import { Application, Request, Response } from 'express';
import { authRouter } from './routes/auth.route';
import { userRouter } from './routes/user.route';
import { areaRouter } from './routes/area.route';
import { parkingRouter } from './routes/parking.route';
import { bookingRouter } from './routes/booking.route';

export default function (app: Application) {
  app.get('/', (req: Request, res: Response) => res.send({ success: true, message: 'Api is working!' }));

  app.use('/v1/api/auth', authRouter);
  app.use('/v1/api/users', userRouter);
  app.use('/v1/api/areas', areaRouter);
  app.use('/v1/api/parkings', parkingRouter);
  app.use('/v1/api/bookings', bookingRouter);
}
