require('dotenv').config()

const PORT = process.env.PORT || 3003
let MONGODB_URI = process.env.MONGODB_URI
if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'developmentdb') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  MONGODB_URI,
  PORT
}
