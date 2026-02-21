const express = require("express");
const { body, validationResult } = require("express-validator");
const Enrollment = require("../models/Enrollment");
const Program = require("../models/Program");
const User = require("../models/User");

const router = express.Router();

router.post(
  "/",
  [
    body("userId").notEmpty().withMessage("UserId required"),
    body("programId").notEmpty().withMessage("ProgramId required")
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

    const { userId, programId } = req.body;

    try {

    
      const userExists = await User.findOne({ userId });
      if (!userExists) {
        return res.status(404).json({
          success: false,
          message: "User not found",
          data: null
        });
      }

   
      const programExists = await Program.findOne({ programId });
      if (!programExists) {
        return res.status(404).json({
          success: false,
          message: "Program not found",
          data: null
        });
      }

     
      const duplicate = await Enrollment.findOne({ userId, programId });
      if (duplicate) {
        return res.status(400).json({
          success: false,
          message: "Already enrolled",
          data: null
        });
      }

     
      const enrollment = await Enrollment.create({ userId, programId });

      res.status(201).json({
        success: true,
        message: "Enrollment successful",
        data: enrollment
      });

    } catch (error) {
      error.status = 500;
      next(error);
    }
  }
);

module.exports = router;