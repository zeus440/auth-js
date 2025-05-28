const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/login", async (req, res) => {
  const { getDataBase } = require("../database/db");
  const { collection } = getDataBase();

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const user = await collection.findOne({ email });

  if (user) {
    bcrypt.compare(password, user.password, async function (err, result) {
      if (result) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        res.status(200).json({
          message: "Login Sucessful!",
          token: token,
        });
      } else {
        res.status(400).json({ error: "Invalid email or password!" });
      }
    });
  } else {
    return res.status(400).json({ error: "Invalid email or password!" });
  }
});

module.exports = router;
