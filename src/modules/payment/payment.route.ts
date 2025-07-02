import { Router } from 'express';
import { PaymentController } from './payment.controller';
import { validate } from '../auth/auth.validator';
import { createPaymentSchema } from './payment.validation';
import { authGuard } from '../auth/guards/auth.guard';

const router = Router();
const controller = new PaymentController();

router.use(authGuard);

router.post('/', validate(createPaymentSchema), controller.create);
router.get('/', controller.findAll);
router.get('/vendor/:vendorId', controller.findByVendor);
router.get('/:id', controller.findById);
router.delete('/:id', controller.delete);

export default router;
