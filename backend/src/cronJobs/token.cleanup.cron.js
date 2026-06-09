import { lt } from "drizzle-orm";
import cron from "node-cron";

import db from "../db/index.config.js";
import { tokenModel } from "../db/models/token.schema.js";

export function cronJobstartTokenCleanupJob() {
    cron.schedule("0 0 * * *", async () => {
        try {
            await db
                .delete(tokenModel)
                .where(lt(tokenModel.expireAt, new Date()));

            console.log("Expired tokens deleted");
        } catch (error) {
            console.log("Cron token cleanup error", error);
        }
    });
}