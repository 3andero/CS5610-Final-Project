import typegoose, { getModelForClass, prop, Ref, ReturnModelType } from "@typegoose/typegoose";
import { Order } from "./order";

export class UserInformation {
  @prop()
  public email!: String;

//   @prop()
//   public order?: Ref<Order>;

  @prop()
  public address!: String;

  @prop()
  public payment?: Number;

  @prop()
  public phone?: Number;

  @prop()
  public avatar?: String;

  static async createUser(
    this: ReturnModelType<typeof UserInformation>,
    email: string,
    // order: Order,
    address: string,
    payment: number,
    phone: number,
    avatar: string
  ): Promise<UserInformation> {
    const res = await this.create({
      email,
    //   order,
      address,
      payment,
      phone,
      avatar,
    });
    return res;
  }
}

export const UserModel = getModelForClass(UserInformation);
