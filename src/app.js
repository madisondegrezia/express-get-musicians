const express = require("express");
const app = express();
const { db } = require("../db/connection");

const port = 3000;

const { musicianRouter } = require("../routes/musicians.js");
const { bandRouter } = require("../routes/bands.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/musicians", musicianRouter);
app.use("/bands", bandRouter);

module.exports = app;
