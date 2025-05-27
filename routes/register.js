const express = require("express");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const users = [];

router.post("/register", (req, res) => {
  const { email, password } = req.body;

  // Email Already Exist?
  const emailAlreadyExists = users.some((user) => user.email === email);

  if (emailAlreadyExists) {
    return res.status(400).json({ error: "Email has been registred." });
  }

  users.push({
    email,
    password,
  });

  return res.status(201).json({ message: "User created successfully! 🎉" });
});

module.exports = router;
