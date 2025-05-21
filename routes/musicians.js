const express = require("express");
const { Musician } = require("../models/index");
const musicianRouter = express.Router();

musicianRouter.get("/", async (req, res) => {
  const musicians = await Musician.findAll({});
  res.json(musicians);
});

musicianRouter.get("/:id", async (req, res) => {
  // fetches musician by id
  const musician = await Musician.findByPk(req.params.id);
  if (musician) {
    res.json(musician);
  } else {
    res.status(404).json({ error: "Musician not found" });
  }
});

musicianRouter.post("/", async (req, res, next) => {
  try {
    const newMusician = await Musician.create(req.body);
    res.status(201).json(newMusician);
  } catch (error) {
    next(error);
  }
});

musicianRouter.put("/:id", async (req, res, next) => {
  try {
    const musician = await Musician.findByPk(req.params.id);
    if (musician) {
      const updatedMusician = await musician.update(req.body);
      res.json(updatedMusician);
    } else {
      res.status(404).json({ error: "Musician not found" });
    }
  } catch (error) {
    next(error);
  }
});

musicianRouter.delete("/:id", async (req, res, next) => {
  try {
    const musician = await Musician.findByPk(req.params.id);
    if (musician) {
      const deletedMusician = await musician.destroy();
      res.json(deletedMusician);
    } else {
      res.status(404).json({ error: "Musician not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = { musicianRouter };
