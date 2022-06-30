import express from "express";
export const router_Products = express.Router();
import { index, product_detail } from "../controllers/productsController";

router_Products.get("/all", index);

router_Products.get("/", product_detail);
