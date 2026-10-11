let logger = require("./Logger");

let APILogger = (req, res, next) => {
  logger.info({
    method: req.method,
    url: req.originalUrl,
    date: new Date().toISOString(),
  });
  next();
};

module.exports = APILogger;