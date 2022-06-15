import typegoose, {
  getModelForClass,
  index,
  modelOptions,
  prop,
  Ref,
  ReturnModelType,
} from "@typegoose/typegoose";
import { Product } from "./product";
import { UserInformation } from "./user_info";

export class ShoppingCart {
  @prop()
  public products!: { product_id: Ref<Product>; quantity: number }[];

  @prop()
  public user_info!: string;
}

export const ShoppingCartModel = getModelForClass(ShoppingCart);
