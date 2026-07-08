import libraryService from "../service/library.service.js";

export const getLibrary = async (req, res, next) => {
    try {
        const userId = req.userId;
        const library = await libraryService.getLibrary(userId);
        return res.status(200).json({ success: true, data: library });
    } catch (error) {
        next(error);
    }
};

export const streamEbook = async (req, res, next) => {
    try {
        const userId = req.userId;
        const { ebookId } = req.params;
        const pdfUrl = await libraryService.getEbookReadUrl(userId, ebookId);
        // Set PDF headers
        res.setHeader('Content-Type', 'application/pdf');
        // Stream PDF from Cloudinary to client
        libraryService.proxyPdfStream(pdfUrl, res, (err) => {
            console.error('Error streaming PDF:', err);
            if (!res.headersSent) {
                res.status(502).json({ success: false, message: 'Failed to stream PDF.' });
            }
        });
    } catch (error) {
        if (error.message.includes('not found') || error.message.includes('access')) {
            return res.status(403).json({ success: false, message: error.message });
        }
        next(error);
    }
};
