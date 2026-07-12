import express from "express";

import {
    oldBookProductAddMiddleware,
    oldBookProductEditMiddleware,
    validateAssetsRedisMiddleware,
    validateuserMiddleware,
    validateNotRestrictedMiddleware
} from "../middleware/book.listing.middleware.js";

import {
    getBookuploadSignatureController,
    getFormMetadataBookUploadController,
    oldBookProductAddController,
    validateAssetsRedisController,
    getUserOldBookListingController,
    deleteUserOldBookProductController,
    markUserOldBookProductSoldController,
    editUserOldBookProductController
} from "../controller/book.listing.controller.js";


const userOldBookProductRouter = express.Router();


userOldBookProductRouter.get("/upload-signature",
    validateuserMiddleware,
    validateNotRestrictedMiddleware,
    getBookuploadSignatureController
);

userOldBookProductRouter.post("/upload-signature/queue",
    validateuserMiddleware,
    validateNotRestrictedMiddleware,
    validateAssetsRedisMiddleware,
    validateAssetsRedisController
);

userOldBookProductRouter.get("/add-book/metadata",
    validateuserMiddleware,
    validateNotRestrictedMiddleware,
    getFormMetadataBookUploadController
);

userOldBookProductRouter.post("/add-book",
    validateuserMiddleware,
    validateNotRestrictedMiddleware,
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

// Edit listing — user can update any field including images
userOldBookProductRouter.patch("/listing/:bookId",
    validateuserMiddleware,
    oldBookProductEditMiddleware,
    editUserOldBookProductController
);

export default userOldBookProductRouter;