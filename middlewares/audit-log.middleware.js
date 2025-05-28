const auditLoggerInterceptResponse = async (req, res, next) => {
  const { getDataBase } = require("../database/db");
  const { auditlogcollection } = getDataBase();

  const originalJson = res.json;

  res.json = function (body) {
    const payload = {
      url: req.originalUrl,
      method: req.method,
      body: req.body,
      params: req.params,
      headers: req.headers,
      statusCode: res.statusCode,
      response: body,
      createdAt: new Date(),
    };

    auditlogcollection.insertOne(payload).catch(console.error);

    return originalJson.call(this, body);
  };

  next();
};

module.exports = auditLoggerInterceptResponse;
