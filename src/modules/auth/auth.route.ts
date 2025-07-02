// src/modules/auth/auth.route.ts
import { Router } from 'express';
import { AuthController } from './auth.controller';
import {
  requestLoginSchema,
  verifyLoginSchema,
  validate,
} from './auth.validator';

const router = Router();
const authController = new AuthController();

router.post('/request-login', validate(requestLoginSchema), authController.requestLogin);

router.post('/verify-login', validate(verifyLoginSchema), authController.verifyLogin);

export default router;
