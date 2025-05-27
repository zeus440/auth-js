const express = require("express");
const app = express();
const port = 3000;

const login = require('./routes/login')
const register = require('./routes/register')

app.use(login)
app.use(register)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
