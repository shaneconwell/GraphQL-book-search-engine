const jwt = require('jsonwebtoken');
require('dotenv').config();

// set token secret and expiration date
const secret = process.env.AUTHSECRET;
// const secret = "password";
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  // authMiddleware: function (req, res, next) {
    authMiddleware: function ({ req }) {
    // allows token to be sent via  req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }
    // if (!token) {
    //   return res.status(400).json({ message: 'You have no token!' });
    // }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
      // return res.status(400).json({ message: 'invalid token!' });
    }

    return req;

    
    // if error, check next() method in hw starter code
    // next();
  },
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};