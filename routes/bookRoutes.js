const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const Author = require("../models/Author");

// Lista todos os livros
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Adiciona um novo livro
router.post("/", async (req, res) => {
  const author = await Author.findById(req.body.authorId);
  if (!author) return res.status(400).json({ message: "Autor não encontrado" });

  const book = new Book({
    title: req.body.title,
    author: { id: author._id, name: author.name },
    publishedDate: req.body.publishedDate,
    isbn: req.body.isbn,
    summary: req.body.summary,
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtém os detalhes de um livro específico
router.get("/:id", getBook, (req, res) => {
  res.json(res.book);
});

async function getBook(req, res, next) {
  let book;
  try {
    book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.book = book;
  next();
}

module.exports = router;
