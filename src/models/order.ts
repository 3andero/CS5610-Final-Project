import typegoose, {
  DocumentType,
  getModelForClass,
  mongoose,
  Passthrough,
  prop,
  Ref,
  ReturnModelType,
} from "@typegoose/typegoose";
import { Product } from "./product";
import { UserInformation } from "./user_info";

export class Order {
  @prop()
  public status!: String;

  @prop()
  public amount!: number;

  @prop({
    type: () =>
      new Passthrough({
        product_id: mongoose.Schema.Types.ObjectId,
        quantity: Number,
      }),
  })
  public products!: { product_id: Ref<Product>; quantity: number }[];

  @prop()
  public userInfo!: string;

  static async createOrder(
    this: ReturnModelType<typeof Order>,
    status: string,
    amount: number,
    productsList: { product_id: Ref<Product>; quantity: number }[],
    userInfo: string
  ): Promise<Order> {
    const res = await this.create({
      status,
      amount,
      products: productsList,
      userInfo,
    });
    return res;
  }
}

export const OrderModel = getModelForClass(Order);
