import { Request, Response } from 'express';
import { PaymentService } from './payment.service';

export class PaymentController {
  private service = new PaymentService();

  create = async (req: Request, res: Response): Promise<void> => {
    const payment = await this.service.create(req.body);
    res.status(201).json({ status: true, message: 'Payment created', data: payment });
  };

  findAll = async (_req: Request, res: Response): Promise<void> => {
    const payments = await this.service.findAll();
    res.json({ data: payments, status: true, message: "payments fetched successfully!" });
  };

  findById = async (req: Request, res: Response): Promise<void> => {
    const payment = await this.service.findById(req.params.id);
    if (!payment) {
      res.status(404).json({ status: false, message: 'Payment not found' });
      return;
    }
    res.json({ data: payment, status: true, message: "payment fetched successfully!" });
  };

  findByVendor = async (req: Request, res: Response): Promise<void> => {
    const payments = await this.service.findByVendor(req.params.vendorId);
    res.json({ status: true, data: payments, message: 'payments fetched' });
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    await this.service.delete(req.params.id);
    res.status(200).json({ status: true, message: "payment deleted successfully!"});
  };
}
