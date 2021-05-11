require('dotenv').config()
// Add enviromental variable handling

// MONGODB_URI
let MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

// PORT
let PORT = process.env.PORT

module.exports = {
  MONGODB_URI,
  PORT
}