import { Book } from "../models/Book.js";

export const findBooks = async (req, res) => {
    const books = await Book.findAll();
    res.json(books);
};

export const findBook = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    res.json(book);
};

export const createBook = async (req, res) => {
    const { title, author, rating, pageCount, summary, imageUrl, available } = req.body;

    if (!title || !author) {
        return res.status(400).json({ message: "Title and author are required." });
    }

    const newBook = await Book.create({
        title,
        author,
        rating,
        pageCount,
        summary,
        imageUrl,
        available,
    });

    res.json(newBook);
};

export const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, rating, pageCount, summary, imageUrl, available } = req.body;

    const book = await Book.findByPk(id);

    if (!book) return res.status(404).json({ message: "Book not found." });

    await book.update({
        title,
        author,
        rating,
        pageCount,
        summary,
        imageUrl,
        available
    });

    res.json(book);
};

export const deleteBook = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findByPk(id);

    if (!book) return res.status(404).json({ message: "Book not found." });

    await book.destroy();

    res.send(`Book with id: ${id} deleted`);
};