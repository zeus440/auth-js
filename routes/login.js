const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

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
        res.status(200).json({ message: "Login Sucessful!" });
      } else {
        res.status(400).json({ error: "Invalid email or password!" });
      }
    });
  } else {
    return res.status(400).json({ error: "Invalid email or password!" });
  }
});

module.exports = router;
