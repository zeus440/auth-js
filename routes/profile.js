const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const { getDataBase } = require("../database/db");

require("dotenv").config();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Unauthorized" });
    req.userId = decoded.id;
    next();
  });
}

router.get("/profile", authMiddleware, async (req, res) => {
  const { collection } = getDataBase();

  const user = await collection.findOne({ _id: new ObjectId(req.userId) });

  res.json({ email: user.email, id: user._id });
});

module.exports = router;
