import jwt from 'jsonwebtoken';
import config from 'config';

export interface Decode {
  expired: boolean;
  decoded: string | jwt.JwtPayload | null;
}

const jwtSecretKey = config.get('jwtSecretKey') as string;

export const sign = (object: Object, options?: jwt.SignOptions | undefined) => {
  // jwt.sign(object, jwtSecretKey, options, function (error, token) {
  //   if(error)
  // });
  return jwt.sign(object, jwtSecretKey, options);
};

export const decode = (token: string): Decode => {
  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    return { expired: false, decoded };
  } catch (error: any) {
    return {
      expired: error.message === 'jwt expired',
      decoded: null,
    };
  }
};

export function createAccessToken(user: any) {
  const accessToken = sign(
    { ...user },
    { expiresIn: config.get('jwtTokenExpiry') } // 15 minutes
  );
  return accessToken;
}
