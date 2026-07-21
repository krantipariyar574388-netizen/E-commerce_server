import "dotenv/config";
import app from "./app.js";
import { connectDatabase } from "./config/db.config";
import ENV_CONFIG from "./config/env.config";
import { verifySMTP } from "./config/nodemailer.config.js";

const PORT = ENV_CONFIG.PORT;
const DB_URI = ENV_CONFIG.DB_URI;

connectDatabase(DB_URI);

app.listen(PORT, async() => {
    await verifySMTP();
    console.log(`Server is start at http://localhost:${PORT}`);
});