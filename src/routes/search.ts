import express from "express";
import { ApiError, MongoDBOrigin } from "../utils";
export const searchRouter = express.Router();

searchRouter.get("/", async (req: express.Request<{}, {}, {}, { text: string, limit: string | null }>, res, next) => {
    const products = MongoDBOrigin.db!.collection("products");
    try {
        const ret = await products.aggregate([
            {
                $search: {
                    "text": {
                        "path": ["name"],
                        "query": req.query.text || "",
                        "fuzzy": {}
                    }
                }
            },
            {
                $limit: req.query.limit && parseInt(req.query.limit) || 10
            },
            {
                $project: {
                    "_id": 1,
                    "name": 1,
                    "image": 1,
                    score: { $meta: "searchScore" }
                }
            }
        ]).toArray();
        res.status(200).send(ret);
    } catch (e: any) {
        next(new ApiError(500, e.message));
    }
});