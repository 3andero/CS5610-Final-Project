import { UserModel, UserInformation } from "../models/user_info";
import { Request, Response, NextFunction, json } from "express";

export const user_create = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  try {
    const data = {
      email: req.body.email,
      id: req.auth.sub,
      address: req.body.address,
      payment: req.body.payment,
      phone: req.body.phone,
      avatar: req.body.avatar,
    } as UserInformation;
    // console.log("123", req, data);
    const newUser = await UserModel.create(data);
    return res.status(200).send();
  } catch (err) {
    return res.send(err);
  }
};

export const user_get = (req: any, res: Response, next: NextFunction) => {
  // console.log(req);
  UserModel.findOne({ id: req.auth.sub }).exec(
    (err, user_: UserInformation | null) => {
      // console.log(err, user_);
      if (err) {
        return next(err);
      }
      // if (!user_) {
      //   const err = new Error("User not found");
      //   return res.status(404);
      // }
      return res.json(user_);
    }
  );
};

export const user_patch = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  // try{
  //   const body_ = await req.json();
  //   res.send(body_);
  // }catch(err){
  //   res.send(err);
  // }
  try {
    const data = await UserModel.updateOne({ id: req.auth.sub }, req.body);
    return res.status(200).send();
  } catch (err) {
    return res.status(404).send(err);
  }
};
