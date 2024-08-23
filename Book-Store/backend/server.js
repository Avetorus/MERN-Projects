import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import mongoose from "mongoose";
import Book from "./models/book.model.js";
import User from "./models/user.model.js";


dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get('/books', async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json({success: true, data: books});
    } catch (error) {
        console.error('Error in fetching data', error.message);
        res.status(500).json({success: false, message: error.message});
    }
});

app.post('/book', async (req, res) => {
    const book = req.body;
    
    if(
        !book.name ||
        !book.author ||
        !book.price ||
        !book.image
    ) {
        res.status(400).send({success: false, message: 'Please provide all fields'});
    }

    const newBook = new Book(book);

    try {
        await newBook.save();
        res.status(201).json({success: true, data: newBook});
    } catch (error) {
        console.error("Error in Create Product", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
});

app.put('/book/:id', async (req, res) => {
    const { id } = req.params;

    const book = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({success: false, message: "invalid book id"});
    } 

    try {
        const bookUpdated = await Book.findByIdAndUpdate(id, book, {new: true});
        res.status(200).json({success: true, data: bookUpdated});
    } catch (error) {
        console.error("Error in Create User", error.message);
        res.status(500).json({succes: false, message: "Server error"});
    }
});

app.delete('/book/:id', async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({success: false, message: "invalid book id"});
    } 

    try {
        await Book.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Book Deleted"});
    } catch (error) {
        console.error("Error in Deleted", error.message);
        res.status(500).json({success: false, message: "Server error"});
    }
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at "http://localhost:${PORT}"`);
});