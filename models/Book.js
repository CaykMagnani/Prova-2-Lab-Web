const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
    name: String,
  },
  publishedDate: { type: Date },
  isbn: String,
  summary: String,
});

module.exports = mongoose.model("Book", BookSchema);
