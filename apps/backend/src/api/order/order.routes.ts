import express from 'express';

const router = express.Router();

router.get('/onramp');

router.post('/order');

router.delete('/order');

router.patch('/order');

router.get('/balance');

export default router;
