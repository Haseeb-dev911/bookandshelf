import express from "express";
import authRouter from "../modules/auth/routes/auth.router.js";
import { seedLocationsRouter } from "../modules/seedCountries/router/seedLocationsRouter.js";
import userOldBookProductRouter from "../modules/sellBook/routes/book.listing.route.js";
import plpRouter from "../modules/PLP/routes/plp.route.js";
import wishlistRouter from "../modules/wishlist/routes/wishlist.route.js";
import profileSettingRouter from "../modules/profile-setting/routes/profile-setting.route.js";
import sellerProfileRouter from "../modules/seller-profile/routes/seller-profile.route.js";
import productRouter from "../modules/Product-page/routes/product.route.js";
import adminRouter from "../modules/admin/routes/admin.route.js";
import eBookCartRouter from "../modules/eBookCart/routes/ebook.cart.route.js";
import paymentRouter from "../modules/payment/routes/payment.route.js";
const mainRouter = express.Router();

mainRouter.use("/seed", seedLocationsRouter);

mainRouter.use("/auth", authRouter);

mainRouter.use("/old-book", userOldBookProductRouter);

mainRouter.use("/plp", plpRouter);

mainRouter.use("/wishlist", wishlistRouter);

mainRouter.use("/settings", profileSettingRouter);

mainRouter.use("/seller-profile", sellerProfileRouter);

mainRouter.use("/product", productRouter);

mainRouter.use("/admin", adminRouter);

mainRouter.use("/cart", eBookCartRouter);

mainRouter.use("/payment", paymentRouter);

export default mainRouter;
