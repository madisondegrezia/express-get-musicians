const express = require("express");
const { Musician } = require("../models/index");
const musicianRouter = express.Router();
const { check, validationResult } = require("express-validator");

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

musicianRouter.post(
  "/",
  [
    check("name")
      .not()
      .isEmpty()
      .trim()
      .withMessage("Name cannot be empty")
      .isLength({ min: 2, max: 20 })
      .withMessage("Name must be between 2 and 20 characters"),
    check("instrument")
      .not()
      .isEmpty()
      .trim()
      .withMessage("Instrument cannot be empty")
      .isLength({ min: 2, max: 20 })
      .withMessage("Instrument must be between 2 and 20 characters"),
  ],
  async (req, res, next) => {
    try {
      // Extracts errors from check()
      const errors = validationResult(req);
      // If there are any errors, return the errors in the response
      if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
      } else {
        const newMusician = await Musician.create(req.body);
        res.status(201).json(newMusician);
      }
    } catch (error) {
      next(error);
    }
  }
);

musicianRouter.put(
  "/:id",
  [
    check("name")
      .not()
      .isEmpty()
      .trim()
      .withMessage("Name cannot be empty")
      .isLength({ min: 2, max: 20 })
      .withMessage("Name must be between 2 and 20 characters"),
    check("instrument")
      .not()
      .isEmpty()
      .trim()
      .withMessage("Instrument cannot be empty")
      .isLength({ min: 2, max: 20 })
      .withMessage("Instrument must be between 2 and 20 characters"),
  ],
  async (req, res, next) => {
    try {
      // Extracts errors from check()
      const errors = validationResult(req);
      // If there are any errors, return the errors in the response
      if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
      } else {
        const musician = await Musician.findByPk(req.params.id);
        if (musician) {
          const updatedMusician = await musician.update(req.body);
          res.json(updatedMusician);
        }
      }
    } catch (error) {
      next(error);
    }
  }
);

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
