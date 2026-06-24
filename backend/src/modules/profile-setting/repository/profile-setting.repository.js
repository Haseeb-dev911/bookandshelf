import { eq } from "drizzle-orm";
import db from "../../../db/index.config.js";
import { userAccountModel } from "../../../db/models/user.account.schema.js";
import { userSettingModel } from "../../../db/models/user.setting.schema.js";
import { citiesModel } from "../../../db/models/cites.schema.js";

export const profileSettingRepository = {
    getUserProfile: async (userId) => {
        const [profile] = await db
            .select({
                id: userAccountModel.id,
                name: userAccountModel.name,
                email: userAccountModel.email,
                role: userAccountModel.role,
                description: userSettingModel.description,
                cityId: userSettingModel.cityId,
                countryId: citiesModel.countryId,
                profileImageUrl: userSettingModel.profileImageUrl,
                profileImageId: userSettingModel.profileImageId,
                profileImageFormat: userSettingModel.profileImageFormat,
                profileImageResourceType: userSettingModel.profileImageResourceType,
            })
            .from(userAccountModel)
            .leftJoin(userSettingModel, eq(userAccountModel.id, userSettingModel.userId))
            .leftJoin(citiesModel, eq(userSettingModel.cityId, citiesModel.id))
            .where(eq(userAccountModel.id, userId))
            .limit(1);

        return profile || null;
    },

    updateUserProfile: async (userId, data) => {
        if (data.name) {
            await db.update(userAccountModel)
                .set({ name: data.name })
                .where(eq(userAccountModel.id, userId));
        }

        const settingsUpdate = {};
        if (data.description !== undefined) {
            settingsUpdate.description = data.description;
        }
        if (data.cityId !== undefined) {
            settingsUpdate.cityId = data.cityId;
        }

        if (Object.keys(settingsUpdate).length > 0) {
            await db.update(userSettingModel)
                .set(settingsUpdate)
                .where(eq(userSettingModel.userId, userId));
        }

        return await profileSettingRepository.getUserProfile(userId);
    },

    updateProfileImage: async (userId, imageDetails) => {
        await db.update(userSettingModel)
            .set({
                profileImageUrl: imageDetails.secure_url,
                profileImageId: imageDetails.public_id,
                profileImageFormat: imageDetails.format,
                profileImageResourceType: imageDetails.resource_type
            })
            .where(eq(userSettingModel.userId, userId));
    },

    deleteProfileImage: async (userId) => {
        await db.update(userSettingModel)
            .set({
                profileImageUrl: null,
                profileImageId: null,
                profileImageFormat: null,
                profileImageResourceType: null
            })
            .where(eq(userSettingModel.userId, userId));
    },

    getUserPasswordHash: async (userId) => {
        const [user] = await db
            .select({ password: userAccountModel.password })
            .from(userAccountModel)
            .where(eq(userAccountModel.id, userId))
            .limit(1);
        return user?.password || null;
    },

    updatePassword: async (userId, newPassword) => {
        await db.update(userAccountModel)
            .set({ password: newPassword })
            .where(eq(userAccountModel.id, userId));
    }
};
