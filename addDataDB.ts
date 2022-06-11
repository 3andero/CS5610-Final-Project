import { ProductModel, Product } from "./src/models/product";
import { OrderModel, Order } from "./src/models/order";
import { appConfig } from "./src/config";
import { mongoose } from "@typegoose/typegoose";

const start = async (): Promise<void> => {
    try {
      await mongoose.connect(
        appConfig.MONGO_DB
      );
      let testProduct = await ProductModel.create({
        price: 1,
        name: "a",
        image: "abc",
        quantity: 10,
      });
      console.log(JSON.stringify(testProduct));
    //   testProduct.save();
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };

void start();

