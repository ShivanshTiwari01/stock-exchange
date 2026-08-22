import express from 'express';
import * as controller from './auth.controller';
import authentication from '../../middleware/authentication';

const router = express.Router();

router.post('/signup', controller.signUp);

router.post('/signin', controller.signIn);

router.get('/whoami', authentication, controller.whoami);

export default router;
