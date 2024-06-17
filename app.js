const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bookRoutes = require("./routes/bookRoutes");
const authorRoutes = require("./routes/authorRoutes");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/bookauthorapi", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/v1/books", bookRoutes);
app.use("/v1/authors", authorRoutes);

module.exports = app;
