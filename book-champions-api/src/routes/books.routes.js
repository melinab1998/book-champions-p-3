import { Router } from "express";
import {
    findBooks,
    findBook,
    createBook,
    updateBook,
    deleteBook
} from "../services/book.services.js"

const router = Router();

router.get("/books", findBooks);
router.get("/books/:id", findBook);
router.post("/books", createBook);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

export default router;