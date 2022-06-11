import typegoose, { prop, Ref } from "@typegoose/typegoose";
import { Product } from "./product";

class Order {
  @prop()
  public status!: String;

  @prop()
  public amount!: Number;

  @prop({ ref: () => Product })
  public products?: Ref<Product>[];
}
