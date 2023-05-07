const { constants } = require("../constants");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  let title;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      title = "Validation Error";
      break;
    case constants.NOT_FOUND:
      title = "Not Found";
      break;
    case constants.UNAUTHORIZED:
      title = "Unauthorized";
      break;
    case constants.FORBIDDEN:
      title = "Forbidden";
      break;
    case constants.INTERNAL_SERVER_ERROR:
      title = "Internal Server Error";
      break;
    default:
      title = "Unknown Error";
      break;
  }

  res.json({
    title: title,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
    status: statusCode,
  });
};

module.exports = errorHandler;
