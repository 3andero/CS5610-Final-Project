import typegoose, {
  DocumentType,
  getModelForClass,
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
  public amount!: Number;

  @prop({ ref: () => Product })
  public products?: Ref<Product>[];

  @prop({ ref: () => UserInformation })
  public userInfo?: Ref<UserInformation>;

  static async createOrder(
    this: ReturnModelType<typeof Order>,
    status: string,
    amount: number,
    productsList: Product[],
    userInfo: UserInformation
  ): Promise<Order> {
    const res = await this.create({
      status,
      amount,
      products: productsList,
      userInfo
    });
    return res;
  }

  // async setProductsAndSave(this: DocumentType<Product>, products: Product[]) {
  //   this.products = products;
  //   await this.save();
  // }
}

export const OrderModel = getModelForClass(Order);
