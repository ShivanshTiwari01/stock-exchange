import express from 'express';
import authRouter from './api/auth/auth.routes';
import marketRouter from './api/market/market.routes';
import orderRouter from './api/order/order.routes';

const router = express.Router();

router.use('/auth', authRouter);

router.use('/market', marketRouter);

router.use('/order', orderRouter);

export default router;
