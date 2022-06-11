import typegoose, { getModelForClass, prop } from "@typegoose/typegoose";

export class Product {
  @prop()
  public price!: Number;

  @prop()
  public name!: String;

  @prop()
  public image?: String;

  @prop()
  public quantity?: Number;

  @prop()
  public discount?: Number;

  @prop()
  public variant?: String;
}

export const ProductModel = getModelForClass(Product);
