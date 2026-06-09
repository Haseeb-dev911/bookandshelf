import express from "express";

import {
    getAllActiveListingsController,
    getAllCategoriesController
} from "../controller/plp.controller.js";


const plpRouter = express.Router();

// GET /plp/listings — fetch all active book listings (public, no auth required)
plpRouter.get("/listings", getAllActiveListingsController);

// GET /plp/categories — fetch all book categories (public, no auth required)
plpRouter.get("/categories", getAllCategoriesController);


export default plpRouter;
