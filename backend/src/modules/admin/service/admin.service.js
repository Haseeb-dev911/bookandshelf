import cloudinary from "../../../config/configcloudinary.js";
import { adminRepository } from "../repository/admin.repository.js";
import { AppError } from "../../../error/App.error.js";
import { getIo } from "../../../config/socket.js";

export const adminService = {
    getDashboardStats: async () => {
        const stats = await adminRepository.getDashboardStats();
        const userGrowth = await adminRepository.getUserGrowthTimeline();
        const listingGrowth = await adminRepository.getListingGrowthTimeline();

        return {
            success: true,
            message: "Stats retrieved successfully",
            errors: null,
            payload: {
                stats,
                userGrowth: userGrowth.map(item => ({
                    date: item.date,
                    count: item.count
                })),
                listingGrowth: listingGrowth.map(item => ({
                    date: item.date,
                    total: item.total,
                    ebookCount: item.ebookCount,
                    physicalCount: item.physicalCount
                }))
            }
        };
    },

    getEbooks: async (params = {}) => {
        const { page = 1, limit = 10 } = params;
        const offset = (page - 1) * limit;

        const ebooks = await adminRepository.getEbooks({ limit, offset });

        return {
            success: true,
            message: "E-books retrieved successfully",
            errors: null,
            payload: ebooks
        };
    },

    createEbook: async (data, userId) => {
        const ebook = await adminRepository.createEbook(data, userId);
        try { getIo().emit("EBOOK_CHANGED", { action: "created" }); } catch (_) {}
        return {
            success: true,
            message: "E-book published successfully",
            errors: null,
            payload: ebook
        };
    },

    updateEbook: async (bookId, data) => {
        const updatedEbook = await adminRepository.updateEbook(bookId, data);
        try { getIo().emit("EBOOK_CHANGED", { action: "updated", bookId }); } catch (_) {}
        return {
            success: true,
            message: "E-book updated successfully",
            errors: null,
            payload: updatedEbook
        };
    },

    deleteEbook: async (bookId) => {
        const deletedBook = await adminRepository.deleteEbook(bookId);

        // Notify all clients instantly so PLP removes the deleted ebook without refresh
        try { getIo().emit("EBOOK_CHANGED", { action: "deleted", bookId }); } catch (_) {}

        // Delete cover image and PDF file from Cloudinary asynchronously
        try {
            if (deletedBook.images && deletedBook.images.length > 0) {
                const coverIds = deletedBook.images.map(img => img.public_id);
                await cloudinary.api.delete_resources(coverIds);
            }
            if (deletedBook.pdfPublicId) {
                await cloudinary.uploader.destroy(deletedBook.pdfPublicId, { resource_type: "raw" });
            }
        } catch (cloudinaryErr) {
            console.error("Failed to clean up Cloudinary assets for deleted ebook:", cloudinaryErr);
        }

        return {
            success: true,
            message: "E-book deleted successfully",
            errors: null,
            payload: null
        };
    },

    applyBulkDiscount: async ({ discountPercentage, categoryId }) => {
        const updatedCount = await adminRepository.applyBulkDiscount({ discountPercentage, categoryId });
        
        return {
            success: true,
            message: `Bulk discount of ${discountPercentage}% applied to ${updatedCount} e-books successfully.`,
            errors: null,
            payload: { updatedCount }
        };
    }
};
