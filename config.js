module.exports = {
  mongoURI: {
  development: 'mongodb://localhost/the-trail',
  production: process.env.MONGOLAB_URI
  },
  TWILIO_ACCT_SID: process.env.ACCT_SID,
  TWILIO_AUTH_TOKEN: process.env.AUTH_TOKEN
};
