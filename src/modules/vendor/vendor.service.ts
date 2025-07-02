import { PrismaClient, Vendor } from "@prisma/client";

export class VendorService {
  private prisma = new PrismaClient();

  create(userId: string, name: string): Promise<Vendor> {
    return this.prisma.vendor.create({
      data: {
        name,
        user: { connect: { id: userId } },
      },
    });
  }

  findAll = (): Promise<Vendor[]> => {
    return this.prisma.vendor.findMany();
  };

  findById = (id: string): Promise<Vendor | null> => {
    return this.prisma.vendor.findUnique({ where: { id } });
  };

  update = (id: string, name: string): Promise<Vendor> => {
    return this.prisma.vendor.update({ where: { id }, data: { name } });
  };

  delete = (id: string): Promise<Vendor> => {
    return this.prisma.vendor.delete({ where: { id } });
  };
}
