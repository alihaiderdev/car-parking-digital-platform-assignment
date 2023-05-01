import { FilterQuery, QueryOptions } from 'mongoose';
import { UserDocument, User } from '../model/user.model';

export async function findUser(query: FilterQuery<UserDocument> = {}, options: QueryOptions = {}) {
  try {
    return await User.findOne(query, {}, options).lean();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findUsers(query: FilterQuery<UserDocument> = {}, options: QueryOptions = {}) {
  try {
    return await User.find(query, {}, options).lean();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteUser(query: FilterQuery<UserDocument> = {}) {
  try {
    return await User.deleteOne(query);
  } catch (error: any) {
    throw new Error(error);
  }
}
