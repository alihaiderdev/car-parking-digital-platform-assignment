import { UserDocument, UserInput, User } from '../model/user.model';

export async function createUser(input: UserInput) {
  try {
    return await User.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function validateEmailAndPassword({ email, password }: { email: UserDocument['email']; password: string }) {
  try {
    const user = await User.findOne({ email });

    if (!user) return false;

    const isValid = await user.comparePassword(password);

    if (!isValid) return false;

    return user;
  } catch (error: any) {
    throw new Error(error);
  }
}
