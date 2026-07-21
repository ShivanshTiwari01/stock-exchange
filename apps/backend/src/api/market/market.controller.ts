import type { Request, Response } from 'express';
import { marketSchema } from './market.validation';
import { prisma } from '@repo/db';

export const createMarket = async (req: Request, res: Response) => {
  const result = marketSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: 'Invalid input data',
    });
  }

  const { name, symbol } = result.data;

  try {
    const marketExist = await prisma.market.findFirst({
      where: {
        symbol,
      },
    });

    if (marketExist) {
      return res.status(400).json({
        success: false,
        message: 'Market already exist',
      });
    }

    const newMarket = await prisma.market.create({
      data: {
        name,
        symbol,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Market created successfully',
      market: {
        name,
        symbol,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const deleteMarket = async (req: Request, res: Response) => {
  const { symbol } = req.body;

  try {
    const marketExists = await prisma.market.findFirst({
      where: {
        symbol,
      },
    });

    if (!marketExists) {
      return res.status(404).json({
        success: false,
        message: 'Market not found',
      });
    }

    await prisma.market.delete({
      where: {
        symbol,
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Market deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const updateMarket = async (req: Request, res: Response) => {
  const result = marketSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: 'Invalid input data',
    });
  }

  const { name, symbol } = result.data;

  try {
    const marketExists = await prisma.market.findFirst({
      where: {
        symbol,
      },
    });

    if (!marketExists) {
      return res.status(404).json({
        success: false,
        message: 'Market not found',
      });
    }

    const updatedMarket = await prisma.market.update({
      where: {
        symbol,
      },
      data: {
        name,
        symbol,
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Market updated successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
