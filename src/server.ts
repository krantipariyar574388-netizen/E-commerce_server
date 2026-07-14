import "dotenv/config";
import app from "./app.js";
import { connectDatabase } from "./config/db.config";
import ENV_CONFIG from "./config/env.config";

const PORT = ENV_CONFIG.PORT;
const DB_URI = ENV_CONFIG.DB_URI;

connectDatabase(DB_URI);

app.listen(PORT,() => {
    console.log(`Server is start at http://localhost:${PORT}`);
});