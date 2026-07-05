import jwt from 'jsonwebtoken';

export const signAccessToken = (payload: object): string => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: '1h',
  });
};

export const signRefreshToken = (payload: object): string => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: '7d',
  });
};

