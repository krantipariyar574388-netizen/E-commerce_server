import express from "express";

const app = express();
app.use(express.json);

app.listen(8002,() => {
    console.log("Server is start at http://localhost:8002");
})