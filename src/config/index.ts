import "dotenv/config";

const config = {
  PORT: process.env.PORT,
  mongoURL: process.env.MONGO_URL,
  mongoName: process.env.MONGO_NAME,
  apiPrefix: process.env.API_PREFIX,
  accessToken: process.env.ACCESS_TOKEN_SECRET,
  refreshToken: process.env.REFRESH_TOKEN_SECRET,
  verifyEmailToken: process.env.VERIF_EMAIL_TOKEN,
  accessTokenExpires: process.env.ACCESS_TOKEN_EXPIRES,
};

export default config;
