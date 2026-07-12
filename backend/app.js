import "dotenv/config";
import express from "express";
import fs from "fs";
import cors from "cors";
import morgan from "morgan";

import mainRouter from "./src/app/main.routes.js";
import { AppError } from "./src/error/App.error.js";
import cookieParser from "cookie-parser";
import { stripeWebhookController } from "./src/modules/payment/controller/payment.controller.js";

const app = express();

app.use(morgan("dev"));
app.use(cookieParser());

// Stripe webhook must receive raw body BEFORE json parsing
app.post("/payment/webhook", express.raw({ type: "application/json" }), stripeWebhookController);
app.post("/api/payment/webhook", express.raw({ type: "application/json" }), stripeWebhookController);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
    // "http://192.168.18.12:5173",
    "http://localhost:5173"
];

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));

app.use("/", mainRouter);

app.use((req, res, next) => {
    throw new AppError("No router found", 404);
});

app.use((err, req, res, next) => {
    console.error("GLOBAL ERROR HANDLER:", err);
    try {
        fs.appendFileSync('error.log', JSON.stringify({ message: err.message, stack: err.stack, errors: err.errors }) + '\n');
    } catch (fsErr) {
        console.error("Failed to write to error.log:", fsErr);
    }
    
    return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || [],
        payload: null
    });
});

export default app;