import { Product, ProductModel } from "../models/product";
import { Request, Response, NextFunction } from "express";

export const index = (req: Request, res: Response, next: NextFunction) => {
  ProductModel.find({}).exec((err, product_list: Product[]) => {
    if (err) {
      return next(err);
    }
    res.json(product_list);
  });
};
