import { IData, ITimestamp } from './index.model';

export interface IAreas extends IData {
  data?: Area[];
}

export interface IArea extends IData {
  data?: Area;
}

export interface Area extends ITimestamp {
  _id: string;
  title: string;
}
