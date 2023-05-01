import { Request, Response } from 'express';
import { createUser, validateEmailAndPassword } from '../services/auth.service';
import { createAccessToken } from '../utils/jwt.utils';

export async function registerHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
  try {
    const user = await createUser(req.body);

    const { password, ...userWithoutPassword } = user.toJSON();

    return res.status(201).send({ success: true, error: false, message: 'User registered successfully!', data: userWithoutPassword });
  } catch (error: any) {
    console.log(`Error: `.red, error);
    return res.status(409).send({ success: false, error: true, message: error.message });
  }
}

export async function loginHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
  try {
    const user = await validateEmailAndPassword(req.body);

    if (!user) {
      return res.status(401).send({ success: false, error: true, message: 'Invalid email or password!' });
    }

    const token = createAccessToken(user);

    const { password, ...userWithoutPassword } = user.toJSON();

    return res.send({ success: true, error: false, message: 'User logged in successfully!', data: { token, user: userWithoutPassword } });
  } catch (error: any) {
    console.log(`Error: `.red, error);
    return res.status(500).send({ success: false, error: true, message: error.message });
  }
}
