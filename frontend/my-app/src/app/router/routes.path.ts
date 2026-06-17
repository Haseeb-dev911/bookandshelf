export const AUTH_ROUTES_PATH = {
  signup: "/signup",
  login: "/login",
  verification: "/verification",
  passwordResetRequest: "/password/reset/request",
  passwordResetVerify: "/password/reset/verify/:sessionId",
  passwordResetConfirm: "/password/reset/confirm/:sessionId",
};

export const AUTH_ROUTE_BUILDER = {
  passwordResetVerify: (sessionId: string) => `/password/reset/verify/${sessionId}`,

  passwordResetConfirm: (sessionId: string) => `/password/reset/confirm/${sessionId}`,
};

export const USER_ROUTES_PATH = {
  home: "/",
  sell: "/sell",
  uploadBookToSell: "/sell/upload",
  setting: "/setting",
  browse: "/browse",
  wishlist: "/wishlist",
  sellerProfile: "/seller/:sellerId",
  product: "/product/:bookId",
  admin: "/admin",
};

export const USER_ROUTE_BUILDER = {
  sellerProfile: (sellerId: string) => `/seller/${sellerId}`,
  product: (bookId: string) => `/product/${bookId}`,
};