const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  biography: String,
  birthDate: { type: Date },
  books: [{ id: String, name: String }],
});

module.exports = mongoose.model("Author", AuthorSchema);
