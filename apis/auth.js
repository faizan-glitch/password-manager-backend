const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware for verifying token sent in each request by the client
const verifyToken = (req, res, next) => { 
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader == 'undefined') {
    res.sendStatus(403);
  }
  else {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];  
    req.token = bearerToken;
    next();
  }
}

router.post('/token', (req, res) => {
  if (process.env.CLIENT_ID != req.body.id) {
    res.sendStatus(403); // Forbidden
  }
  else {
    const client = {
      id: process.env.CLIENT_ID,
      name: process.env.CLIENT_NAME
    };
    // Send a JWT to the client
    // The Client needs to attach this JWT to the Authorization header for each request
    jwt.sign({ client }, process.env.APP_SECRET, (err, token) => {
      if (err) {
        res.sendStatus(500); // Internal Server Error
      }
      else {
        res.json({ token });
      }
    });
  }
});

router.post('/login', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.APP_SECRET, (err, authData) => {
    if(err) {
      res.sendStatus(403);
    }
    else {
      res.json({
        message: 'Login Page',
        authData
      })
    }
  });
});

module.exports = router;