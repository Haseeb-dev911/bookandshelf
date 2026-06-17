import { desc, eq, gt } from "drizzle-orm";

import db from "../../../db/index.config.js";

import { countriesModel } from "../../../db/models/countries.schema.js";
import { citiesModel } from "../../../db/models/cites.schema.js";
import { userAccountModel } from "../../../db/models/user.account.schema.js";
import { userSettingModel } from "../../../db/models/user.setting.schema.js";
import { tokenModel } from "../../../db/models/token.schema.js";


export const authRepostory = {
    verifyCountryId: async (countryId) => {
        const id = parseInt(countryId, 10);
        if (isNaN(id)) return [];
        const verifyCountryId = await db
            .select()
            .from(countriesModel)
            .where(eq(countriesModel.id, id))
            .limit(1);
        return verifyCountryId;
    },

    verifyCityId: async (cityId) => {
        const id = parseInt(cityId, 10);
        if (isNaN(id)) return [];
        const verifyCityId = await db
            .select()
            .from(citiesModel)
            .where(eq(citiesModel.id, id))
            .limit(1);
        return verifyCityId;
    },

    CheckExistingAccount: async (email) => {
        const checkUserAccount = await db
            .select()
            .from(userAccountModel)
            .where(eq(userAccountModel.email, email))
            .limit(1);
        return checkUserAccount.length > 0;
    },

    createUserAccount: async (data) => {
        const [createNewUserAccount] = await db
            .insert(userAccountModel)
            .values({
                name: data.name,
                email: data.email,
                rawEmail: data.rawEmail,
                password: data.password
            })
            .returning();

        const [creatingUserAccountFields] = await db
            .insert(userSettingModel)
            .values({
                userId: createNewUserAccount.id,
                cityId: data.city,
            })
            .returning();

        return { userAccount: createNewUserAccount }
    },

    createTokenOnUser: async (token, userId) => {
        const insertingToken = await db
            .insert(tokenModel)
            .values({
                userId,
                token,
                expireAt: new Date(Date.now() + 20 * 60 * 1000)
            })
            .returning();
        return insertingToken;
    },

    UpdateUserAccountToVerifed: async (userId) => {
        const [updateVerfiedUser] = await db
            .update(userAccountModel)
            .set({ isEmailVerified: true })
            .where(eq(userAccountModel.id, userId))
            .returning();

        return updateVerfiedUser;
    },

    loginUserAccount: async (email) => {
        const [checkUserAccount] = await db
            .select()
            .from(userAccountModel)
            .where(eq(userAccountModel.email, email))
            .limit(1);
        return checkUserAccount;
    },

    userEmailExitsRecurData: async (email) => {
        const checkUserAccount = await db.query.userAccountModel.findFirst({
            where: (eq(userAccountModel.rawEmail, email))
        });

        return checkUserAccount;
    },

    updatePasswordOnResetRequest: async (userId, password) => {
        const updateUserPassword = await db
            .update(userAccountModel)
            .set({ password })
            .where(eq(userAccountModel.id, userId))
            .returning();

        return updateUserPassword;
    },

    findUserAccountViaId: async (userId) => {
        return await db.query.userAccountModel.findFirst({
            where: eq(userAccountModel.id, userId),
        });
    },

    upgradeUserToAdmin: async (userId) => {
        await db.update(userAccountModel)
            .set({ role: "admin" })
            .where(eq(userAccountModel.id, userId));
    }
}

export const tokenRepostory = {
    verifyUserTokenSignUp: async (userId) => {
        const [tokenCheckResponse] = await db
            .select()
            .from(tokenModel)
            .where(eq(tokenModel.userId, userId), gt(tokenModel.expireAt, new Date()))
            .orderBy(desc(tokenModel.createdAt))
            .limit(1);

        return tokenCheckResponse;
    },

    reSendTokenUpdate: async (userId, token) => {
        const [resendTokenNewData] = await db
            .insert(tokenModel)
            .values({
                userId,
                token,
                expireAt: new Date(Date.now() + 20 * 60 * 1000)
            })
            .returning();

        return resendTokenNewData;
    },


    deleteAllTokenSessions: async (userId) => {
        await db
            .delete(tokenModel)
            .where(eq(tokenModel.userId, userId));
    }
}