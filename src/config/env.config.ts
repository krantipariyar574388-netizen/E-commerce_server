import "dotenv/config";

const ENV_CONFIG = {
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI!!,
  NODE_ENV: process.env.NODE_ENV,

  //! cloudinary

  //! jwt
  JWT_SECRET: process.env.JWT_SECRET!!,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN!!,

  // Cookie
  COOKIE_EXPIRY: Number(process.env.COOKIE_EXPIRY) ?? 7,

  // mail
  SMTP_HOST: process.env.SMTP_HOST!!,
  SMTP_PORT: Number(process.env.SMTP_PORT) || 465,
  SMTP_SERVICE: process.env.SMTP_SERVICE || "gmail",
  SMTP_MAIL: process.env.SMTP_MAIL!!,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD!!,
  SENDER_NAME: process.env.SENDER_NAME || "TEAM_15",
};

export default ENV_CONFIG;
