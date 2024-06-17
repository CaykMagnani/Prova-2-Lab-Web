const express = require("express");
const router = express.Router();
const Author = require("../models/Author");

// Lista todos os autores
router.get("/", async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Adiciona um novo autor
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
    biography: req.body.biography,
    birthDate: req.body.birthDate,
  });

  try {
    const newAuthor = await author.save();
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtém os detalhes de um autor específico
router.get("/:id", getAuthor, (req, res) => {
  res.json(res.author);
});

// Remove um autor
router.delete("/:id", getAuthor, async (req, res) => {
  try {
    await res.author.remove();
    res.status(204).json({ message: "Autor removido com sucesso" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getAuthor(req, res, next) {
  let author;
  try {
    author = await Author.findById(req.params.id);
    if (author == null) {
      return res.status(404).json({ message: "Autor não encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.author = author;
  next();
}

module.exports = router;
