require('dotenv').config();

// Port where server is located
const PORT = process.env.PORT;
// URI to connect to MongoDb database
const MONGODB_URI = process.env.NODE_ENV === 'test' ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI;

const SECRET = process.env.SECRET;

module.exports = {
  PORT,
  MONGODB_URI,
  SECRET,
};
