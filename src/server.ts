import app from "./app.js";
import { connectDatabase } from "./config/db.config.js";

const PORT = 8002;
const DB_URI = "mongodb://localhost:27017";

connectDatabase(DB_URI);

app.listen(PORT,() => {
    console.log("Server is start at http://localhost:8002");
});