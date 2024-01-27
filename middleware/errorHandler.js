const notFoundHandler = (req, res, next) => {
  res.status(404).send("your requested content was not found");
};

const errorHandler = (error, req, res, next) => {
  if (error) {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
      success: false,
      status: statusCode,
      error: error?.message ? error.message : error,
      stack: process.env.NODE_ENV === "production" ? null : error.stack,
    });
  }
};

module.exports = { errorHandler, notFoundHandler };
