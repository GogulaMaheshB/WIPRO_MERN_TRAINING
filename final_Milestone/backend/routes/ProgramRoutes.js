const express = require("express");
const { body, validationResult } = require("express-validator");
const Program = require("../models/Program");

const router = express.Router();

// POST /api/programs
router.post(
  "/",
  [
    body("programId").notEmpty().withMessage("ProgramId required"),
    body("name").notEmpty().withMessage("Name required"),
    body("category").notEmpty().withMessage("Category required"),
    body("level")
      .isIn(["Beginner", "Intermediate", "Advanced"])
      .withMessage("Invalid level"),
    body("price")
      .isNumeric()
      .withMessage("Price must be number")
      .custom(value => value >= 0)
  ],
  async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        data: null
      });
    }

    try {
      const program = await Program.create(req.body);

      res.status(201).json({
        success: true,
        message: "Program created successfully",
        data: program
      });

    } catch (error) {
      error.status = 500;
      next(error);
    }
  }
);

// GET /api/programs
router.get("/", async (req, res, next) => {
  try {
    const programs = await Program.find();

    res.status(200).json({
      success: true,
      message: "Programs fetched",
      data: programs
    });

  } catch (error) {
    error.status = 500;
    next(error);
  }
});

module.exports = router;