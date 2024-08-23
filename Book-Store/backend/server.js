import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import bookRouter from "./routes/book.route.js";


dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use('/book', bookRouter);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at "http://localhost:${PORT}"`);
});