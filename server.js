const express = require("express");
const app = express();
const port = 3000;

// Middleware para processar JSON
app.use(express.json());

let books = [];
let authors = [];

// Rotas de livros
app.get("/v1/books", (req, res) => {
  res.json(books);
});

app.post("/v1/books", (req, res) => {
  const newBook = {
    id: `${Date.now()}`, // Simples ID gerado com a data atual
    ...req.body,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.get("/v1/books/:id", (req, res) => {
  const book = books.find((b) => b.id === req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Rotas de autores
app.get("/v1/authors", (req, res) => {
  res.json(authors);
});

app.post("/v1/authors", (req, res) => {
  const newAuthor = {
    id: `${Date.now()}`, // Simples ID gerado com a data atual
    ...req.body,
  };
  authors.push(newAuthor);
  res.status(201).json(newAuthor);
});

app.get("/v1/authors/:id", (req, res) => {
  const author = authors.find((a) => a.id === req.params.id);
  if (author) {
    res.json(author);
  } else {
    res.status(404).json({ message: "Author not found" });
  }
});

app.delete("/v1/authors/:id", (req, res) => {
  const authorId = req.params.id;
  const authorIndex = authors.findIndex((a) => a.id === authorId);

  if (authorIndex === -1) {
    return res.status(404).json({ message: "Author not found" });
  }

  const booksByAuthor = books.filter((b) => b.authorId === authorId);
  if (booksByAuthor.length > 0) {
    return res
      .status(400)
      .json({
        message:
          "Cannot delete author. There are books related to this author.",
      });
  }

  authors.splice(authorIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}/v1`);
});
