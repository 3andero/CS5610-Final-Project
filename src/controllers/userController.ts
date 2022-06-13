import { UserModel, UserInformation } from "../models/user_info";
import { Request, Response, NextFunction } from "express";
interface Error {
  status?: number;
}
export const user_detail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(req.params);
  UserModel.findById(req.params.userId).exec((err, user_: UserInformation | null) => 
  {
    if (err) {
      return next(err);
    }
    if (!user_) {
      const err = new Error("User not found");
      return res.status(404);
    }
    res.json(user_);
  });
};
