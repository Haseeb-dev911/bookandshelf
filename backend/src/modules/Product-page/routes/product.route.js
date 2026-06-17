import express from "express";
import { getProductDetailsController } from "../controller/product.controller.js";

const productRouter = express.Router();

productRouter.get("/:bookId", getProductDetailsController);

export default productRouter;
