import { Request, Response, NextFunction, json, RequestHandler } from "express";
import { ObjectId } from "mongoose";
import { Product, ProductModel } from "../models/product";
import { ShoppingCart, ShoppingCartModel } from "../models/shoppingCart";

export const cart_create: RequestHandler<
  {},
  {},
  {
    products: { product_id: ObjectId; quantity: number }[];
  }
> = (req, res, next) => {
  const data = {
    products: req.body.products,
    user_info: req.auth?.sub,
  };
  ShoppingCartModel.find({ user_info: req.auth!.sub }).exec(
    async (err, item) => {
      if (err) {
        return next(err);
      }
      if (item.length === 0) {
        try {
          const newCart = await ShoppingCartModel.create(data);
          return res.status(200).send();
        } catch (err) {
          return next(err);
        }
      } else {
        const updatedCart = await ShoppingCartModel.updateOne(
          { user_info: req.auth!.sub },
          req.body
        );
        return res.status(200).send();
      }
    }
  );
};

export const cart_get: RequestHandler = (req, res, next) => {
  ShoppingCartModel.find({ user_info: req.auth!.sub }).exec((err, item) => {
    if (err) {
      return next(err);
    }
    return res.json(item);
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
