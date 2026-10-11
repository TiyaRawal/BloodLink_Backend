let logger = require("./Logger");

let ErrorLogger = (err, req, res, next) => {
  logger.error({
    method: req.method,
    url: req.originalUrl,
    message: err.message,
    date: new Date().toISOString(),
  });

  return res.status(500).send({success: false, message: "Something went wrong"});
};

module.exports = ErrorLogger;