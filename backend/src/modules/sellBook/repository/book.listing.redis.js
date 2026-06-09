import redis from "../../../config/redis.config.js";


export const oldBookListingRepositoryRedis = {
    imageCleanUpSet: async (currentTime, redisValue) => {
        
        await redis.zAdd("image_cleanup_set", {
            score: currentTime, value: redisValue
        });
    },


}