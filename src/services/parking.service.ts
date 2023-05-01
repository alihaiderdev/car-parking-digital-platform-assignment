import { FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import { ParkingDocument, Parking } from '../model/parking.model';

export async function createParking(input: ParkingDocument) {
  try {
    return await Parking.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findParking(query: FilterQuery<ParkingDocument> = {}, options: QueryOptions = {}) {
  try {
    return await Parking.findOne(query, {}, options).lean();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findParkings(query: FilterQuery<ParkingDocument> = {}, options: QueryOptions = {}) {
  try {
    return await Parking.find(query, {}, options).lean();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function updateParking(query: FilterQuery<ParkingDocument> = {}, update: UpdateQuery<ParkingDocument> = {}, options: QueryOptions = {}) {
  try {
    return await Parking.findOneAndUpdate(query, update, options);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteParking(query: FilterQuery<ParkingDocument> = {}) {
  try {
    return await Parking.deleteOne(query);
  } catch (error: any) {
    throw new Error(error);
  }
}
