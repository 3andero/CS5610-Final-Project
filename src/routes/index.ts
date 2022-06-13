import express from "express"
import {index} from "../controllers/productsController"
export const router_Index = express.Router();

router_Index.get('/', function(req, res){
    res.redirect('/products');
});

