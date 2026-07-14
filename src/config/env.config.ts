import "dotenv/config";

const ENV_CONFIG = {
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI!!,

  //! cloudinary

  //! jwt
};

export default ENV_CONFIG;