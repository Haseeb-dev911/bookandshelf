import jwt from "jsonwebtoken";

export const verifiedUserCookie = async function (
    res,
    userId,
    cookieTime
) {

    const jwtToken = jwt.sign(
        { userId },
        process.env.JWTTOKENCODE,
        {
            algorithm: "HS256",
            expiresIn: "20d",
        }
    );
    res.cookie("book_shelf_token", jwtToken, {
        httpOnly: true,
        maxAge: cookieTime,
        secure: false,
        sameSite: "lax",
        path: "/"
    });
}



export const AuthAssignCookieToken = async function (
    res, // response
    authData, // userId
    timeJWT,
    timeCookie,
    cookieName = "tokenAuth") {
    console.log(authData);

    const jwtToken = jwt.sign(
        { userId: authData },
        process.env.JWTTOKENCODE,
        {
            algorithm: "HS256",
            expiresIn: timeJWT,
        }
    );

    res.cookie(cookieName, jwtToken, {
        httpOnly: true,
        maxAge: timeCookie,
        secure: false,
        sameSite: "lax",
        path: "/"
    });
}