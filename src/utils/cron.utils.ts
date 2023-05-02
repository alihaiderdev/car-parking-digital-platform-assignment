import cron from 'node-cron';
import { Booking } from '../models/booking.model';

export const runCronJob = (time: number): void => {
  cron.schedule(`*/${time} * * * *`, () => {
    console.log('running a task every minute');
    Booking.find();
  });
};
