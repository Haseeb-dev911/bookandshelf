import express from "express";
import authRouter from "../modules/auth/routes/auth.router.js";
import { seedLocationsRouter } from "../modules/seedCountries/router/seedLocationsRouter.js";
import userOldBookProductRouter from "../modules/sellBook/routes/book.listing.route.js";
import plpRouter from "../modules/PLP/routes/plp.route.js";
import wishlistRouter from "../modules/wishlist/routes/wishlist.route.js";


const mainRouter = express.Router();

mainRouter.use("/seed", seedLocationsRouter);

mainRouter.use("/auth", authRouter);

mainRouter.use("/old-book", userOldBookProductRouter);

mainRouter.use("/plp", plpRouter);

mainRouter.use("/wishlist", wishlistRouter);

// mainRouter.use("/settings", settingsRouter)


export default mainRouter;