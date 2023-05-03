import cron from 'node-cron';
import { Booking } from '../models/booking.model';
import { Parking } from '../models/parking.model';

export const runCronJob = (time: string): void => {
  cron.schedule(time, async () => {
    try {
      console.log('running a task every minute', new Date());
      const bookings = await Booking.find({ endTime: { $lte: new Date() } });

      const parkingIds = bookings.map((booking) => booking.parking?._id);

      await Parking.updateMany({ _id: { $in: parkingIds } }, { isBooked: false }, { multi: true });
    } catch (error: any) {
      console.log(`Error: `.red, error);
    }
  });
};
