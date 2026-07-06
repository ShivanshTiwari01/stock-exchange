import express from 'express';
import * as controller from './auth.controller';

const router = express.Router();

router.post('/signup', controller.signUp);

router.post('/signin', controller.signIn);

export default router;
