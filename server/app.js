/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());
app.use(
  "/uploads/images",
  express.static(path.join(__dirname, "uploads", "images"))
);
console.log(path.join(__dirname, "uploads", "images"));
app.use(express.static(path.join(__dirname, "..", "build")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/posts", postsRoutes);
app.use((req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  const error = new HttpError("Could no find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(path.join(__dirname, "..", "build"), "index.html"));
});

mongoose
  .connect("mongodb://localhost:27017/CarApp")
  .then(() => app.listen(5000))
  .catch((err) => console.log(err));
