import { PrismaClient, Payment } from '@prisma/client';

export class PaymentService {
  private prisma = new PrismaClient();

  create(data: { amount: number; currency: string; vendorId: string }): Promise<Payment> {
    return this.prisma.payment.create({ data });
  }

  findAll(): Promise<Payment[]> {
    return this.prisma.payment.findMany();
  }

  findById(id: string): Promise<Payment | null> {
    return this.prisma.payment.findUnique({ where: { id } });
  }

  findByVendor(vendorId: string): Promise<Payment[]> {
    return this.prisma.payment.findMany({ where: { vendorId } });
  }

  delete(id: string): Promise<Payment> {
    return this.prisma.payment.delete({ where: { id } });
  }
}
