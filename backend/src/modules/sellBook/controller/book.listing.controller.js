import {
    getBookuploadSignatureService,
    getFormMetadataBookUploadService,
    oldBookProductAddService,
    validateAssetsRedisService,
    getUserOldBookListingService,
    deleteUserOldBookProductService,
    markUserOldBookProductSoldService,
    editListingService
} from "../service/book.listing.service.js"; 


export const getBookuploadSignatureController = async (req, res, next) => {
    try {
        const getURLSignatureResponse = getBookuploadSignatureService();

        return res.status(201).json(getURLSignatureResponse);

    } catch (error) {
        next(error);
    }
}

export const validateAssetsRedisController = async (req, res, next) => {
    try {
        const saveAssetsToRedisData = await validateAssetsRedisService(req.sanitizedBody);

        return res.status(200).json(saveAssetsToRedisData);
    } catch (error) {
        next(error);
    }
}

export const getFormMetadataBookUploadController = async (req, res, next) => {
    try {
        const responseForFormMetaData = await getFormMetadataBookUploadService(req.userId);

        return res.status(200).json({
            success: true,
            message: "Meta of User Account",
            errors: null,
            payload: responseForFormMetaData
        });
    } catch (error) {
        next(error);
    }
}

export const oldBookProductAddController = async (req, res, next) => {
    try {
        const oldBookAddResponse = await oldBookProductAddService(req.sanitizedBody, req.userId);

        return res.status(200).json({
            success: true,
            message: "Book Added to selling",
            errors: null,
            payload: {
                bookId: oldBookAddResponse.bookId
            }
        });
    } catch (error) {
        next(error);
    }
}

export const getUserOldBookListingController = async (req, res, next) => {
    try {
        const categoryId = req.query.categoryId;

        const listings = await getUserOldBookListingService(req.userId, categoryId);

        return res.status(200).json({
            success: true,
            message: "User listings fetched successfully",
            errors: null,
            payload: listings
        });
    } catch (error) {
        next(error);
    }
}

export const deleteUserOldBookProductController = async (req, res, next) => {
    try {
        const bookId = req.params.bookId;
        const result = await deleteUserOldBookProductService(bookId, req.userId);

        return res.status(200).json({
            success: result.success,
            message: result.message,
            errors: null,
            payload: null
        });
    } catch (error) {
        next(error);
    }
}

export const markUserOldBookProductSoldController = async (req, res, next) => {
    try {
        const bookId = req.params.bookId;
        const result = await markUserOldBookProductSoldService(bookId, req.userId);

        return res.status(200).json({
            success: result.success,
            message: result.message,
            errors: null,
            payload: null
        });
    } catch (error) {
        next(error);
    }
}

export const editUserOldBookProductController = async (req, res, next) => {
    try {
        const bookId = req.params.bookId;
        const result = await editListingService(bookId, req.userId, req.sanitizedBody);

        return res.status(200).json({
            success: result.success,
            message: result.message,
            errors: null,
            payload: null
        });
    } catch (error) {
        next(error);
    }
}