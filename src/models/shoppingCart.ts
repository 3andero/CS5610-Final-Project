import typegoose, {
  getModelForClass,
  index,
  modelOptions,
  Passthrough,
  prop,
  Ref,
  ReturnModelType,
} from "@typegoose/typegoose";
import { Product } from "./product";
import { UserInformation } from "./user_info";
import * as mongoose from "mongoose";

// class ProductPair{
//   @prop()
//   public
// }

export class ShoppingCart {
  @prop({
    type: () =>
      new Passthrough({
        product_id: mongoose.Schema.Types.ObjectId,
        quantity: Number,
      }),
  })
  public products!: { product_id: Ref<Product>; quantity: number }[];

  @prop({ required: true, unique: true })
  public user_info!: string;
}

export const ShoppingCartModel = getModelForClass(ShoppingCart);
