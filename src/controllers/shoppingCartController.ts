import { Request, Response, NextFunction, json, RequestHandler } from "express";
import { ObjectId } from "mongoose";
import { Product, ProductModel } from "../models/product";
import { ShoppingCartModel } from "../models/shoppingCart";

export const cart_create: RequestHandler<
  {},
  {},
  {
    products: { product_id: ObjectId; quantity: number }[];
  }
> = async (req, res, next) => {
  try {
    // ProductModel.findById(req.body.product_id).exec(
    //   (err, product_: Product | null) => {
    //     if (err) {
    //       return next(err);
    //     }
    //     if (product_ === null || product_.quantity < req.body.quantity) {
    //       return res.send(product_);
    //     }
    //     if (product_.quantity < req.body.quantity) {
    //       return res.send({});
    //     }
    //   }
    // );
    const data = {
      products: req.body.products,
      user_info: req.auth?.sub,
    };
    const newCart = await ShoppingCartModel.create(data);
    return res.status(200).send();
  } catch (err: any) {
    return next(err);
  }
};

export const cart_get: RequestHandler = (req, res, next) => {
  ShoppingCartModel.find({ user_info: req.auth!.sub }).exec((err, items) => {
    if (err) {
      return next(err);
    }
    return res.json(items);
  });
};

export const cart_delete: RequestHandler = (req, res, next) => {
  ShoppingCartModel.deleteOne({ user_info: req.auth!.sub }).exec(
    (err, deletion) => {
      if (err) {
        return next(err);
      }
      return res.status(200).send();
    }
  );
};
