const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
    data: null
  });
};

module.exports = errorHandler;