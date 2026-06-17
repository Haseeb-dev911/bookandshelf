import { getSellerProfileService } from "../service/seller-profile.service.js";

export const getSellerProfileController = async (req, res, next) => {
    try {
        const { sellerId } = req.params;
        const response = await getSellerProfileService(sellerId);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};
