import express from "express";
import { getSellerProfileController } from "../controller/seller-profile.controller.js";

// ─── Seller Profile Router ────────────────────────────────────────────────────
// Public route — no auth required to view a seller's profile.

const sellerProfileRouter = express.Router();

// GET /seller-profile/:sellerId  — fetch seller info + their active listings
sellerProfileRouter.get("/:sellerId", getSellerProfileController);

export default sellerProfileRouter;
