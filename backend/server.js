import app from "./app.js";

import { connectRedis } from "./src/config/redis.config.js";
import { cronJobstartTokenCleanupJob } from "./src/cronJobs/token.cleanup.cron.js";
import { initializeRateLimiters } from "./src/modules/auth/utils/auth.rate.limiter.js";


// all cron jobs
cronJobstartTokenCleanupJob();

process.on("SIGINT", () => {
    console.log(`\n` + "The termial interpeted :: ©️");
    process.exit(1);
});

process.on("unhandledRejection", (err) => {

    console.log(`\n` + "The reason to server shutdown", err);
    process.exit(1);
});


const port = process.env.PORT || 3000;


async function startSever() {

    await connectRedis();

    initializeRateLimiters();

    const { default: app } = await import("./app.js");
    app.listen(port, "0.0.0.0", () => {
        console.log(`The server is running on ${port} ✔️`);
    });
}
startSever();