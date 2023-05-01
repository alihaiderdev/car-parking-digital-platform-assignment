import { FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import { AreaDocument, Area } from '../model/area.model';

export async function createArea(input: AreaDocument) {
  try {
    return await Area.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findArea(query: FilterQuery<AreaDocument> = {}, options: QueryOptions = {}) {
  try {
    return await Area.findOne(query, {}, options).lean();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findAreas(query: FilterQuery<AreaDocument> = {}, options: QueryOptions = {}) {
  try {
    return await Area.find(query, {}, options).lean();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function updateArea(query: FilterQuery<AreaDocument> = {}, update: UpdateQuery<AreaDocument> = {}, options: QueryOptions = {}) {
  try {
    return await Area.findOneAndUpdate(query, update, options);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteArea(query: FilterQuery<AreaDocument> = {}) {
  try {
    return await Area.deleteOne(query);
  } catch (error: any) {
    throw new Error(error);
  }
}
