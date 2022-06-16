import { ProductModel, Product } from "./src/models/product";
import { OrderModel, Order } from "./src/models/order";
import { appConfig } from "./src/config";
import { mongoose } from "@typegoose/typegoose";
import { UserModel } from "./src/models/user_info";

var products: Product[] = [];
var orders: Order[] = [];

const start = async (): Promise<void> => {
  try {
    await mongoose.connect(appConfig.MONGO_DB);
    products.push(await ProductModel.createProduct(10, "a", "image_of_a", 2, true, "beautiful a"),
    await ProductModel.createProduct(20,"b","image_of_b",5, true, "wonderful b"),
    await ProductModel.createProduct(30,"c","image_of_c",0, true, "lovely c"),
    await ProductModel.createProduct(15,"d","image_of_d",6, true, "tasty d"),
    await ProductModel.createProduct(62,"e","image_of_e",1, true, "colorful e"),
    await ProductModel.createProduct(109,"f","image_of_f",19, true, "expensive f"));
    console.log(products);
    // const userOne = await UserModel.createUser("hyue623@neu.edu","123","abc street", 123, 123, "avatar");
    // console.log(userOne);
    // const newOrder = await OrderModel.createOrder("paid", 75, products, userOne);
    // console.log(newOrder);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();
