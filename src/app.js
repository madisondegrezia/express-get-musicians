const express = require("express");
const app = express();
const { Musician, Band } = require("../models/index");
const { db } = require("../db/connection");

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//TODO: Create a GET /musicians route to return all musicians
app.get("/musicians", async (req, res) => {
  const musicians = await Musician.findAll({});
  res.json(musicians);
});

app.get("/musicians/:id", async (req, res) => {
  // fetches musician by id
  const musician = await Musician.findByPk(req.params.id);
  if (musician) {
    res.json(musician);
  } else {
    res.status(404).json({ error: "Musician not found" });
  }
});

app.post("/musicians", async (req, res, next) => {
  try {
    const newMusician = await Musician.create(req.body);
    res.status(201).json(newMusician);
  } catch (error) {
    next(error);
  }
});

app.put("/musicians/:id", async (req, res, next) => {
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

app.delete("/musicians/:id", async (req, res, next) => {
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

app.get("/bands", async (req, res) => {
  const bands = await Band.findAll({});
  res.json(bands);
});

module.exports = app;
