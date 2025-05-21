const express = require("express");
const { Musician, Band } = require("../models/index");
const bandRouter = express.Router();

bandRouter.get("/", async (req, res, next) => {
  try {
    const bands = await Band.findAll({ include: Musician });
    if (bands) {
      res.json(bands);
    } else {
      res.status(404).json({ error: "Bands not found" });
    }
  } catch (error) {
    next(error);
  }
});

bandRouter.get("/:id", async (req, res, next) => {
  try {
    const band = await Band.findByPk(req.params.id, { include: Musician });
    if (band) {
      res.json(band);
    } else {
      res.status(404).json({ error: "Band not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = { bandRouter };
