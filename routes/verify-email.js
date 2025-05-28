const express = require("express");
const router = express.Router();
const { getDataBase } = require("../database/db");

router.get("/", async (req, res) => {
  const { token } = req.query;
  const { collection } = getDataBase();

  if (!token) {
    return res.status(400).json({ error: "Token is required." });
  }

  const user = await collection.findOne({ emailToken: token });

  if (!user) {
    return res.status(400).json({ error: "Invalid or expired token." });
  }

  await collection.updateOne(
    { _id: user._id },
    {
      $set: { isVerified: true },
      $unset: { emailToken: "" },
    }
  );

  return res.status(200).json({ message: "Email verified successfully! 🎉" });
});

module.exports = router;
