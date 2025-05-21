const express = require("express");
const { Musician, Band } = require("../models/index");
const bandRouter = express.Router();

bandRouter.get("/", async (req, res) => {
  const bands = await Band.findAll({});
  res.json(bands);
});

module.exports = { bandRouter };
