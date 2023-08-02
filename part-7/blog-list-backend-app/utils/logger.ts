// Method to log information
const info = (...params: any[]) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params);
  }
};

// Method to log errors
const error = (...params: any[]) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(...params);
  }
};

module.exports = {
  info,
  error,
};
