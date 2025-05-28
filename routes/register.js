const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const saltRounds = 10;

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const { getDataBase } = require("../database/db");
  const { collection } = getDataBase();

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const query = { email };
  const emailAlreadyExists = await collection.findOne(query);

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
    bcrypt.hash(password, salt, async function (err, hash) {
      const user = { email, password: hash };

      await collection.insertOne(user);

      return res.status(201).json({ message: "User created successfully! 🎉" });
    });
  });
});

module.exports = router;
