import express from "express";
import { createBook, deleteBook, getBook, updateBook } from "../controllers/book.controller.js";

const router = express.Router();

router.get('/', getBook);

router.post('/', createBook);

router.put('/:id', updateBook);

router.delete('/:id', deleteBook);

export default router;