import { Router } from "express";
import {
    findBooks,
    findBook,
    createBook,
    updateBook,
    deleteBook
} from "../services/book.services.js"
import { verifyToken } from "../middlewares/auth.js";

const router = Router();

router.get("/books", verifyToken, findBooks);
router.get("/books/:id", verifyToken, findBook);
router.post("/books", verifyToken, createBook);
router.put("/books/:id", verifyToken, updateBook);
router.delete("/books/:id", verifyToken, deleteBook);

export default router;