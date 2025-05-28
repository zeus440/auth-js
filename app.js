const helmet = require('helmet')
const express = require("express");
const app = express();
const port = 3000;

const login = require("./routes/login");
const register = require("./routes/register");
const { connectToDatabase } = require("./database/db");

app.use(helmet())
app.use(login);
app.use(register);

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
});
