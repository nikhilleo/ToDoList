const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const createError = require("http-errors");
require("./helper/mongodb__init");
const list = require("./Routes/List.routes");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("Appd started");
app.use(list);

app.use((req, res, next) => {
  next(createError.NotFound("Page not found"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.log("err = ", err);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
