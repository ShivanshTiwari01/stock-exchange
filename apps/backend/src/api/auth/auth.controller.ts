import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { userSchema } from './auth.validation';

import { prisma } from '@repo/db';
import { signAccessToken, signRefreshToken } from '../../helper/authentication';

export const signUp = async (req: Request, res: Response) => {
  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: 'Invalid input data',
    });
  }

  const { username, password } = result.data;

  try {
    const userExists = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Username already taken',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    const accessToken = signAccessToken({
      userId: user.id,
    });

    const refreshToken = signRefreshToken({
      userId: user.id,
    });

    return res.status(201).json({
      success: true,
      message: 'user created successfully',
      data: {
        token: {
          accessToken,
          refreshToken,
        },
        username,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: 'Invalid input data',
    });
  }

  const { username, password } = result.data;

  try {
    const userExists = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const passwordMatch = await bcrypt.compare(password, userExists.password!);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password',
      });
    }

    const accessToken = signAccessToken({
      userId: userExists.id,
    });

    const refreshToken = signRefreshToken({
      userId: userExists.id,
    });

    return res.status(200).json({
      success: true,
      message: 'User logged in succesfully',
      data: {
        token: {
          accessToken,
          refreshToken,
        },
        username,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const whoami = async (req: Request, res: Response) => {
  const { userId } = req.user!;

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'user not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'user found succesfully',
      data: {
        username: user.username,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
