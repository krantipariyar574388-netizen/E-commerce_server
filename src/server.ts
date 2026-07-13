import "dotenv/config";
import app from "./app.js";
import { connectDatabase } from "./config/db.config";

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI!!;

connectDatabase(DB_URI);

app.listen(PORT,() => {
    console.log(`Server is start at http://localhost:${PORT}`);
});