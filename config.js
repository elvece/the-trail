module.exports = {
  MONGO_URI: {
    development: 'mongodb://localhost/the-trail',
    production: process.env.MONGOLAB_URI
  },
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN
};
