import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface UserInput {
  name: string;
  email: string;
  password: string;
}

export interface UserDocument extends UserInput, Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(inputPassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema<UserDocument>(
  {
    name: { type: String, default: '' },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required!'],
      lower: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter valid email!',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
      min: [8, 'Please enter atleast 8 characters long password!'],
    },
  },
  { timestamps: true, versionKey: false }
);

UserSchema.pre('save', async function (next) {
  let user = this as UserDocument;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // Random additional data
  const salt = await bcrypt.genSalt(config.get('passwordSaltRound'));
  const hash = await bcrypt.hashSync(user.password, salt);

  // Replace the password with the hash
  user.password = hash;
  return next();
});

// Used for logging in
UserSchema.methods.comparePassword = async function (inputPassword: string) {
  const user = this as UserDocument;

  return bcrypt.compare(inputPassword, user.password).catch((error) => false);
};

export const User = mongoose.model<UserDocument>('User', UserSchema);
