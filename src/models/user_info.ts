import typegoose, {
  getModelForClass,
  index,
  modelOptions,
  prop,
  Ref,
  ReturnModelType,
} from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { id: false } })
@index({ id: 1 })
export class UserInformation {
  @prop()
  public email!: String;

  @prop({ required: true, unique: true })
  public id!: String;

  @prop()
  public address!: String;

  @prop()
  public payment?: String;

  @prop()
  public phone?: String;

  @prop()
  public avatar?: String;

  @prop()
  public first_name?: String;

  @prop()
  public last_name?: String;

  @prop()
  public bio?: String;

  @prop()
  public country?: String;

  @prop()
  public city?: String;

  static async createUser(
    this: ReturnModelType<typeof UserInformation>,
    email: string,
    id: string,
    address: string,
    payment: string,
    phone: string,
    avatar: string,
    first_name: string,
    last_name: string,
    bio: string,
    country: string,
    city: string
  ): Promise<UserInformation> {
    const res = await this.create({
      email,
      id,
      address,
      payment,
      phone,
      avatar,
      first_name,
      last_name,
      bio,
      country,
      city,
    });
    return res;
  }
}

export const UserModel = getModelForClass(UserInformation);
