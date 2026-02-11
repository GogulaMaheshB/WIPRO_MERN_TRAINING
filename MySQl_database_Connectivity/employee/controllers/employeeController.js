const pool = require("../db/connection");
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

exports.getAllEmployees = async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employees");
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

exports.createEmployee = async (req, res, next) => {
  try {
    const { name, email, department } = req.body;
    if (!name || !email || !department) {
      return res.status(400).json({
        message: "Name, email and department are required"
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        message: "Invalid email format"
      });
    }


    await pool.query(
      "INSERT INTO employees (name, email, department) VALUES (?, ?, ?)",
      [name, email, department]
    );

    res.status(201).json({ message: "Employee Register successfully" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Email already exists" });
    }
    next(error);
  }
};
