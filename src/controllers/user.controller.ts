import { Request, Response } from 'express';
import { deleteUser, findUser, findUsers } from '../services/user.service';

export async function getUserHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
  try {
    const user = await findUser({ _id: req.params.userId });
    return res.status(200).send({ success: true, error: false, message: 'Successfully fetch user!', data: user });
  } catch (error: any) {
    console.log(`Error: `.red, error);
    return res.status(500).send({ success: false, error: true, message: error.message });
  }
}

export async function getUsersHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
  try {
    const users = await findUsers();
    return res.status(200).send({ success: true, error: false, message: 'Successfully fetch all users!', data: users });
  } catch (error: any) {
    console.log(`Error: `.red, error);
    return res.status(500).send({ success: false, error: true, message: error.message });
  }
}

export async function deleteUserHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
  try {
    await deleteUser({ _id: req.params.userId });
    return res.status(200).send({ success: true, error: false, message: 'User deleted successfully!' });
  } catch (error: any) {
    console.log(`Error: `.red, error);
    return res.status(500).send({ success: false, error: true, message: error.message });
  }
}
