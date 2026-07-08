import cloudinary from "../../../config/configcloudinary.js";
import https from "https";
import http from "http";
import libraryRepository from "../repository/library.repository.js";

const libraryService = {
    getLibrary: async (userId) => {
        const library = await libraryRepository.getPurchasedEbooks(userId);
        return library;
    },

    /**
     * Verify purchase and return a direct Cloudinary raw URL (no signing).
     * The controller will proxy‑stream this URL to the client.
     */
    getEbookReadUrl: async (userId, ebookId) => {
        const ebook = await libraryRepository.verifyPurchase(userId, ebookId);
        if (!ebook) {
            throw new Error("E-book not found or you do not have access to it.");
        }
        if (ebook.status !== "active") {
            throw new Error("This e-book is no longer active.");
        }
        if (!ebook.pdfPublicId) {
            throw new Error("E-book file is missing.");
        }
        // Cloudinary blocks PDF delivery by default. To bypass this, we use the Admin API 
        // to generate a secure, time-limited private download URL using the API key and signature.
        const expiresAt = Math.floor(Date.now() / 1000) + 15 * 60; // 15 mins
        const downloadUrl = cloudinary.utils.private_download_url(
            ebook.pdfPublicId,
            'pdf',
            {
                resource_type: "raw",
                type: "upload", // assets are uploaded with the default 'upload' type
                expires_at: expiresAt
            }
        );
        return downloadUrl;
    },

    /**
     * Stream a PDF from a Cloudinary URL to the writeable stream.
     */
    proxyPdfStream: (pdfUrl, writeStream, onError) => {
        const fetchUrl = (url) => {
            const protocol = url.startsWith("https") ? https : http;
            protocol.get(url, (res) => {
                if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                    // Follow redirect
                    return fetchUrl(res.headers.location);
                }
                if (res.statusCode !== 200) {
                    onError(new Error(`Cloudinary responded with ${res.statusCode}`));
                    return;
                }
                res.pipe(writeStream);
            }).on("error", onError);
        };
        fetchUrl(pdfUrl);
    }
};

export default libraryService;
