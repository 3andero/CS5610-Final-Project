import typegoose, {
  getModelForClass,
  modelOptions,
  prop,
  ReturnModelType,
} from "@typegoose/typegoose";

@modelOptions({ options: { customName: "products" } })
export class Product {
  [x: string]: any;
  @prop({ required: true })
  public price!: number;

  @prop({ required: true })
  public name!: String;

  @prop()
  public image?: String;

  @prop()
  public quantity?: Number;

  @prop()
  public discount?: Number;

  @prop()
  public variant?: String;

  static async createProduct(
    this: ReturnModelType<typeof Product>,
    price: number,
    name: string,
    image: string,
    quantity: number
  ): Promise<Product> {
    const res = await this.create({
      price,
      name,
      image,
      quantity,
    });
    return res;
  }
}

export const ProductModel = getModelForClass(Product);
