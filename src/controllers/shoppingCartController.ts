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
  ShoppingCartModel.find({ user_info: req.auth!.sub }).exec(
    async (err, item) => {
      if (err) {
        return next(err);
      }
      // console.log(data);
      // console.log(JSON.stringify(item));
      if (item.length === 0) {
        try {
          const newCart = await ShoppingCartModel.create(data);
          return res.status(200).send();
        } catch (err) {
          // console.log(err);
          return next(err);
        }
      } else {
        // console.log("2");
        const updatedCart = await ShoppingCartModel.updateOne(
          { user_info: req.auth!.sub },
          req.body
        );
        return res.status(200).send();
      }
    }
  );
  // console.log("here");
  // const newCart = await ShoppingCartModel.create(data);
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
