import { Product, ProductModel } from "../models/product";
import { Request, Response, NextFunction, RequestHandler } from "express";

export const index = (req: Request, res: Response, next: NextFunction) => {
  ProductModel.find({}).exec((err, product_list: Product[]) => {
    if (err) {
      return next(err);
    }
    res.json(product_list);
  });
};

export const product_detail: RequestHandler = (req, res, next) => {
  ProductModel.findOne({ _id: req.query._id }).exec(
    (err: any, target_product: Product | null) => {
      if (err) {
        return next(err);
      }
      res.json(target_product);
    }
  );
};
