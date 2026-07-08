import { Router } from "express";
import { getLibrary, streamEbook } from "../controller/library.controller.js";
import { validateuserMiddleware } from "../../sellBook/middleware/book.listing.middleware.js";

const libraryRouter = Router();

// Get all purchased ebooks for the logged in user
libraryRouter.get("/", validateuserMiddleware, getLibrary);

// Get a signed Cloudinary URL to read a specific ebook
libraryRouter.get("/:ebookId/read", validateuserMiddleware, streamEbook);

export default libraryRouter;
