import { authRepostory } from "../../auth/repository/auth.repository.js";
import { AppError } from "../../../error/App.error.js";
import { errorsCollectZod } from "../../auth/utils/error.collect.zod.js";
import { ebookValidationSchema, ebookUpdateValidationSchema, ebookBulkDiscountSchema } from "../validation/admin.ebook.validation.js";
import { validateuserMiddleware } from "../../sellBook/middleware/book.listing.middleware.js";

export const validateAdminMiddleware = async (req, res, next) => {
    // 1. Run validateuserMiddleware to verify token and session
    validateuserMiddleware(req, res, async (err) => {
        if (err) return next(err);

        try {
            // 2. Fetch user details from database to verify role
            const user = await authRepostory.findUserAccountViaId(req.userId);
            
            if (!user || user.role !== "admin") {
                return next(new AppError("Access denied", 403, [{
                    field: "role",
                    message: "You do not have administrative privileges to access this resource."
                }]));
            }

            req.user = user;
            next();
        } catch (error) {
            return next(new AppError("Failed to authenticate admin session", 401));
        }
    });
};

export const validateEbookMiddleware = (req, res, next) => {
    const validationResult = ebookValidationSchema.safeParse(req.body);

    if (!validationResult.success) {
        const collectingErrors = errorsCollectZod(validationResult);
        return next(new AppError("Input field error", 400, collectingErrors));
    }

    next();
};

export const validateUpdateEbookMiddleware = (req, res, next) => {
    const validationResult = ebookUpdateValidationSchema.safeParse(req.body);

    if (!validationResult.success) {
        const collectingErrors = errorsCollectZod(validationResult);
        return next(new AppError("Input field error", 400, collectingErrors));
    }

    next();
};

export const validateBulkDiscountMiddleware = (req, res, next) => {
    const validationResult = ebookBulkDiscountSchema.safeParse(req.body);

    if (!validationResult.success) {
        const collectingErrors = errorsCollectZod(validationResult);
        return next(new AppError("Input field error", 400, collectingErrors));
    }

    next();
};
