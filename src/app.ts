import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './modules/auth/auth.route';
import vendorRoutes from './modules/vendor/vendor.route'
import paymentRoutes from './modules/payment/payment.route';
import './modules/auth/strategy/jwt.strategy';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/vendor', vendorRoutes);
app.use('/payments', paymentRoutes);
app.get('/', (req, res) => {
  res.send('Vendor API is live 🚀');
});

export default app;
