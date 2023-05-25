// Method to log information
const info = (...params: any[]) => {
  console.log(...params);
};

// Method to log errors
const error = (...params: any[]) => {
  console.error(...params);
};

module.exports = {
  info,
  error,
};
