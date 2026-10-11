let { body, validationResult } = require("express-validator");

let ValidatePatientRegister = [
  body("email").isEmail().withMessage("Please enter a valid email"),

  body("phone").isLength({ min: 10, max: 10 }).isNumeric().withMessage("Phone number must be 10 digits"),

  body("pincode").isLength({ min: 6, max: 6 }).isNumeric().withMessage("Pincode must be 6 digits"),

  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

  (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {return res.status(400).send({success: false, errors: errors.array()});
    }
    next();
  },
];

module.exports = ValidatePatientRegister;