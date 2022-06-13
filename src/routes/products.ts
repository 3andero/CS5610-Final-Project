import express from "express"
export const router_Products = express.Router();
import {index} from "../controllers/productsController"
import { user_detail } from "../controllers/userController";


router_Products.get("/", index)

router_Products.get("/:userId", user_detail);