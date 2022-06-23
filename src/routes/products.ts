import express from "express";
export const router_Products = express.Router();
import { index } from "../controllers/productsController";

router_Products.get("/", index);
