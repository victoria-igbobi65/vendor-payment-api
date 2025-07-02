import { Router } from 'express';
import { VendorController } from './vendor.controller';
import { createVendorSchema } from './vendor.validation';
import { validate } from '../auth/auth.validator';
import { authGuard } from '../auth/guards/auth.guard';

const router = Router();
const controller = new VendorController();

router.use(authGuard);


router.post('/',validate(createVendorSchema), controller.create);
router.get('/', controller.findAll);
router.get('/:id', controller.findById);
router.put('/:id', validate(createVendorSchema), controller.update);
router.delete('/:id', controller.delete);

export default router;
