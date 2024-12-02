// errorHandler.js

const errorHandler = (err, req, res) => {
  console.error(err.stack);
  console.error('err.message', err);
  res.status(500).json({ error: err.message });
};

module.exports = errorHandler;