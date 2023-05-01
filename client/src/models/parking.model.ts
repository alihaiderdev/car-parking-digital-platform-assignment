import { IData, ITimestamp } from './index.model';

export interface IParkings extends IData {
  data?: Parking[];
}

export interface IParking extends IData {
  data?: Parking;
}

export interface Parking extends ITimestamp {
  _id: string;
  area: string;
  title: string;
  isBooked: boolean;
  order: number;
  position?: Position;
}

export interface Position {
  rowStart: number;
  rowEnd: number;
  columnStart: number;
  columnEnd: number;
}
