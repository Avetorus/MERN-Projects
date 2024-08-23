import Book from "../models/book.model.js";
import mongoose from "mongoose";

export const getBook = async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json({success: true, data: books});
    } catch (error) {
        console.error('Error in fetching data', error.message);
        res.status(500).json({success: false, message: error.message});
    }
};

export const createBook = async (req, res) => {
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
};

export const updateBook =  async (req, res) => {
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
};

export const deleteBook = async (req, res) => {
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
};