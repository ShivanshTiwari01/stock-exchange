import express from 'express';
import * as controller from './market.controller';

const router = express.Router();

router.post('/market', controller.createMarket);

router.delete('/market', controller.deleteMarket);

router.put('/market', controller.updateMarket);

export default router;
