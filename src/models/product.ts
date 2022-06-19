import typegoose, {
  DocumentType,
  getModelForClass,
  modelOptions,
  prop,
  ReturnModelType,
} from "@typegoose/typegoose";

@modelOptions({ options: { customName: "products" } })
export class Product {
  @prop({ required: true })
  public price!: number;

  @prop({ required: true })
  public name!: String;

  @prop()
  public image!: String;

  @prop()
  public quantity!: number;

  @prop()
  public discount?: number;

  @prop()
  public is_available!: boolean;

  @prop()
  public description!: string;

  static async createProduct(
    this: ReturnModelType<typeof Product>,
    price: number,
    name: string,
    image: string,
    quantity: number,
    is_available: boolean,
    description: string
  ): Promise<Product> {
    const res = await this.create({
      price,
      name,
      image,
      quantity,
      is_available,
      description,
    });
    return res;
  }

  async setQuantityAndSave(this: DocumentType<Product>, quantity: number) {
    this.quantity = quantity;
    await this.save();
  }
}

export const ProductModel = getModelForClass(Product);
