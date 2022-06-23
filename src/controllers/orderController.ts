import { Request, Response, NextFunction, json, RequestHandler } from "express";
import mongoose from "mongoose";
import { Order, OrderModel } from "../models/order";
import { Product, ProductModel } from "../models/product";
import { ShoppingCartModel } from "../models/shoppingCart";

//order post includs: find product;
//adjust quantity; set quantity of original product;
//calculate price
//post order
export const order_post: RequestHandler = async (req, res, next) => {
  let price = 0;
  //adjust quantity; set quantity of original product;
  const newProducts_array = await Promise.all(
    req.body.map(
      async (product: {
        product_id: mongoose.Schema.Types.ObjectId;
        quantity: number;
      }) => {
        try {
          const update = await ProductModel.findById(product.product_id).exec();
          if (!update) {
            return update;
          }
          if (update?.quantity < product.quantity) {
            product.quantity = update.quantity;
          }
          await update.setQuantityAndSave(update.quantity - product.quantity);
          return [product, update.price];
        } catch (e) {
          return next(e);
        }
      }
    )
  );

  //calculate price
  const newProducts = newProducts_array.map((prod_array) => {
    const [new_prod, each_price] = prod_array;
    const { quantity } = new_prod;
    price += each_price * quantity;
    return new_prod;
  });

  //post order
  try {
    const data = {
      products: newProducts,
      userInfo: req.auth?.sub,
      status: "unpaid",
      amount: price,
    };
    const creation = await OrderModel.create(data);

    //delete shopping cart
    const deletion = await ShoppingCartModel.deleteOne({
      user_info: req.auth!.sub,
    }).exec();

    return res.status(200).send({});
  } catch (e) {
    return res.send(e);
  }
};

export const order_get: RequestHandler = (req, res, next) => {
  OrderModel.find({ user_info: req.auth!.sub }).exec((err, orders) => {
    console.log(orders);
    if (err) {
      next(err);
    }
    return res.json(orders);
  });
};
