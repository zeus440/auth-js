const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: {
    status: 429,
    message: "Too many login attempts. Please try again later.",
  },
});

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: {
    status: 429,
    message: "Too many registration attempts. Please try again later.",
  },
});

module.exports = {
  loginLimiter,
  registerLimiter,
};
