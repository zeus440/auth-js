const helmet = require("helmet");
const express = require("express");
const app = express();
const port = 3000;

const login = require("./routes/login");
const register = require("./routes/register");
const profile = require("./routes/profile");
const { connectToDatabase } = require("./database/db");
const {
  loginLimiter,
  registerLimiter,
} = require("./middlewares/rateLimit.middleware");

app.use(helmet());
app.use("/login", loginLimiter, login);
app.use("/register", registerLimiter, register);
app.use(profile);

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
});
