import { Request, Response, NextFunction, json, RequestHandler } from "express";
import { ObjectId } from "mongoose";
import { Product, ProductModel } from "../models/product";
import { ShoppingCart, ShoppingCartModel } from "../models/shoppingCart";

export const cart_create: RequestHandler<
  {},
  {},
  { product_id: ObjectId; quantity: number }[]
> = (req, res, next) => {
  const data = {
    products: req.body,
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
          { products: req.body }
        );
        return res.status(200).send();
      }
    }
  );
};

export const cart_get: RequestHandler = async (req, res, next) => {
  try {
    const items = await ShoppingCartModel.find({
      user_info: req.auth!.sub,
    }).exec();
    if (items.length === 0) {
      res.status(200).send([]);
      return;
    }
    const product_ids = items[0]["products"];
    const product_details = await Promise.all(
      product_ids.map(async (prod) => {
        try {
          const prod_detail = await ProductModel.findById(
            prod.product_id
          ).exec();
          if (!prod_detail) {
            return prod_detail;
          }
          prod_detail.quantity = prod.quantity;
          return prod_detail;
        } catch (e) {
          console.log(e);
          return next(e);
        }
      })
    );
    return res.json(product_details);
  } catch (err) {
    return next(err);
  }
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
