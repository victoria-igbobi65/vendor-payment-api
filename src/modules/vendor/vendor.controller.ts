import { Request, Response } from "express";
import { VendorService } from "./vendor.service";

export class VendorController {
  private vendorService = new VendorService();

  create = async (req: Request, res: Response): Promise<void> => {
    const user = req.user as any;
    const vendor = await this.vendorService.create(user.id, req.body.name);
    res
      .status(201)
      .json({ status: true, message: "Vendor created", data: vendor }); // ✅ no return
  };

  findAll = async (_req: Request, res: Response): Promise<void> => {
    const vendors = await this.vendorService.findAll();
    res.json({ status: true, message: 'vendors fetched succesfully!', data: vendors });
  };

  findById = async (req: Request, res: Response): Promise<void> => {
    const vendor = await this.vendorService.findById(req.params.id);
    if (!vendor) {
      res.status(404).json({ status: false, message: "Vendor not found" });
      return;
    }
    res.json({ data: vendor, status: true, message: 'vendor fetched succesfully!' });
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body;
    const vendor = await this.vendorService.update(req.params.id, name);
    res.json({ message: "Vendor updated", data: vendor, status: true });
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    await this.vendorService.delete(req.params.id);
    res.status(200).json({ status: true, message: 'vendor deleted succesfully'});
  };
}
