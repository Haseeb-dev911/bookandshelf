import nodemailer from "nodemailer";
import { AppError } from "../error/App.error.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USEREMAIL,
        pass: process.env.EMAILPASSWORD
    }
});
export const emailVerficationSenderUntils = function (name, email, text) {
    try {
        console.log(text);

        let emailOptions = {
            from: process.env.USEREMAIL,
            to: email,
            subject: "Verfication Code",
            html: `
                        <html>
                        <head>
                            <meta charset="UTF-8" />
                            <title>Welcome to Book&Shelf</title>
                        </head>

                        <body style="margin:0; padding:0; background-color:#f4f6fb; font-family:Arial, sans-serif;">

                            <!-- Outer container -->
                            <div style="max-width:600px; margin:40px auto; padding:20px;">

                            <!-- Header -->
                            <div style="text-align:center; margin-bottom:20px;">
                                <h1 style="color:#1f2a44; margin:0; font-size:26px;">
                                Book&Shelf
                                </h1>
                                <p style="color:#6b7280; margin:5px 0 0;">
                                Secure & Modern Book Platform
                            </p>
                            </div>

                            <!-- Card -->
                            <div style="background:#ffffff; padding:35px; border-radius:12px; box-shadow:0 8px 20px rgba(0,0,0,0.06);">

                                <h2 style="color:#111827; text-align:center; margin-bottom:10px;">
                                Welcome, ${name} 👋
                                </h2>

                                <p style="color:#6b7280; font-size:15px; text-align:center; line-height:1.6;">
                                Your account has been successfully created.
                                To complete your signup, please verify your email using the code below.
                                </p>

                                <!-- OTP Box -->
                                <div style="margin:30px auto; text-align:center;">
                                <div style="display:inline-block; padding:15px 25px; font-size:22px; letter-spacing:6px; font-weight:bold; color:#1f2a44; background:#f4f6fb; border:1px dashed #4f46e5; border-radius:8px;">
                                    ${text}
                                </div>
                                </div>

                                <!-- Safety Note -->
                                <p style="margin-top:30px; font-size:12px; color:#9ca3af; text-align:center; line-height:1.5;">
                                If you did not create this account, you can safely ignore this email.
                                This code will expire in 20 minutes.
                                </p>

                            </div>

                            <!-- Footer -->
                            <p style="text-align:center; font-size:11px; color:#9ca3af; margin-top:20px;">
                                © ${new Date().getFullYear()} Book&Shelf. All rights reserved.
                            </p>

                            </div>

                        </body>
                        </html>`
        }

        transporter.sendMail(emailOptions);
    } catch (error) {
        throw error;
    }
}


export const resetPasswordEmailSenderUtils = function (email, name, verficationCode) {
    try {
        console.log(verficationCode);

        let emailOptions = {
            from: process.env.USEREMAIL,
            to: email,
            subject: "Reset Your Password",
            html: `
            <html>
            <head>
                <meta charset="UTF-8" />
                <title>Password Reset - Book&Shelf</title>
            </head>

            <body style="margin:0; padding:0; background-color:#f4f6fb; font-family:Arial, sans-serif;">

                <!-- Outer Container -->
                <div style="max-width:600px; margin:40px auto; padding:20px;">

                    <!-- Header -->
                    <div style="text-align:center; margin-bottom:20px;">
                        <h1 style="color:#1f2a44; margin:0; font-size:26px;">
                            Book&Shelf
                        </h1>

                        <p style="color:#6b7280; margin:5px 0 0;">
                            Secure Password Recovery
                        </p>
                    </div>

                    <!-- Card -->
                    <div style="background:#ffffff; padding:35px; border-radius:12px; box-shadow:0 8px 20px rgba(0,0,0,0.06);">

                        <h2 style="color:#111827; text-align:center; margin-bottom:10px;">
                            Reset Your Password 🔐
                        </h2>

                        <p style="color:#6b7280; font-size:15px; text-align:center; line-height:1.6;">
                            Hello ${name},
                            <br /><br />
                            We received a request to reset your password.
                            Use the verification code below to continue.
                        </p>

                        <!-- OTP Box -->
                        <div style="margin:30px auto; text-align:center;">
                            <div style="display:inline-block; padding:15px 25px; font-size:22px; letter-spacing:6px; font-weight:bold; color:#1f2a44; background:#f4f6fb; border:1px dashed #4f46e5; border-radius:8px;">
                                ${verficationCode}
                            </div>
                        </div>

                        <!-- Additional Info -->
                        <p style="color:#6b7280; font-size:14px; text-align:center; line-height:1.6;">
                            Enter this code on the password reset page to create a new password.
                        </p>

                        <!-- Safety Note -->
                        <p style="margin-top:30px; font-size:12px; color:#9ca3af; text-align:center; line-height:1.5;">
                            If you did not request a password reset, you can safely ignore this email.
                            <br />
                            This code will expire in 20 minutes.
                        </p>

                    </div>

                    <!-- Footer -->
                    <p style="text-align:center; font-size:11px; color:#9ca3af; margin-top:20px;">
                        © ${new Date().getFullYear()} Book&Shelf. All rights reserved.
                    </p>

                </div>

            </body>
            </html>`
        };

        transporter.sendMail(emailOptions);
    } catch (error) {
        console.log(error);
        throw new AppError("Email not send", 500, [{ field: "email", message: "Try again later, email not send" }])
    }
}
