const {body,validationResult} = require("express-validator");

exports.validateOrder = [
    body("custname")
    .notEmpty()
    .withMessage("Customer name is required"),
    body("items")
    .isArray({min: 1})
    .withMessage("Items must be a non-empty array"),
    body("items.*.product_id")
    .isInt({ min: 1 })
    .withMessage("Invalid product id"),
    body("items.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),
    (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }

];