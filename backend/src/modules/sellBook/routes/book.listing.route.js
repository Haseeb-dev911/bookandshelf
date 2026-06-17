import express from "express";

import {
    oldBookProductAddMiddleware,
    validateAssetsRedisMiddleware,
    validateuserMiddleware
} from "../middleware/book.listing.middleware.js";

import {
    getBookuploadSignatureController,
    getFormMetadataBookUploadController,
    oldBookProductAddController,
    validateAssetsRedisController,
    getUserOldBookListingController,
    deleteUserOldBookProductController,
    markUserOldBookProductSoldController
} from "../controller/book.listing.controller.js";


const userOldBookProductRouter = express.Router();


userOldBookProductRouter.get("/upload-signature",
    validateuserMiddleware,
    getBookuploadSignatureController
);

userOldBookProductRouter.post("/upload-signature/queue",
    validateuserMiddleware,
    validateAssetsRedisMiddleware,
    validateAssetsRedisController
);

userOldBookProductRouter.get("/add-book/metadata",
    validateuserMiddleware,
    getFormMetadataBookUploadController
);

userOldBookProductRouter.post("/add-book",
    validateuserMiddleware,
    oldBookProductAddMiddleware,
    oldBookProductAddController
);

userOldBookProductRouter.get("/listing",
    validateuserMiddleware,
    getUserOldBookListingController
);

userOldBookProductRouter.delete("/listing/:bookId",
    validateuserMiddleware,
    deleteUserOldBookProductController
);

userOldBookProductRouter.patch("/listing/:bookId/sold",
    validateuserMiddleware,
    markUserOldBookProductSoldController
);

export default userOldBookProductRouter;