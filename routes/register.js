const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const saltRounds = 10;

const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");

require("dotenv").config();

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
      const user = {
        email,
        password: hash,
        emailToken: uuidv4(),
        isVerified: false,
      };

      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await collection.insertOne(user);

      (async () => {
        try {
          const info = await transporter.sendMail({
            from: `"${process.env.SMTP_NAME}" <${process.env.SMTP_USER}>`,
            to: `${user.email}`,
            subject: "Confirm your email",
            text: `http://localhost:3000/verify-email?token=${user.emailToken}`,
            html: `<a href='http://localhost:3000/verify-email?token=${user.emailToken}'>Verify my email</a>`,
          });

          console.log("Email sent:", info.messageId);
          console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
        } catch (err) {
          console.error("Failed to send email:", err);
        }
      })();

      return res.status(201).json({ message: "User created successfully! 🎉" });
    });
  });
});

module.exports = router;
