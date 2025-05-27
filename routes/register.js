const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const saltRounds = 10;

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const users = [];

router.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const emailAlreadyExists = users.some((user) => user.email === email);

  if (emailAlreadyExists) {
    return res.status(400).json({ error: "Email has been registred." });
  }

  const keys = Object.keys(req.body);
  const allowFields = ["email", "password"];
  const invalidFields = keys.filter((key) => !allowFields.includes(key));

  if (invalidFields.length > 0) {
    return res
      .status(400)
      .json({ error: `Invalid fields: ${invalidFields.join(", ")}` });
  }

  if (password.length < 8) {
    return res.status(400).json({
      error: "Password must be at least 8 characters long.",
    });
  }

  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      users.push({
        email,
        password: hash,
      });

      return res.status(201).json({ message: "User created successfully! 🎉" });
    });
  });
});

module.exports = router;
