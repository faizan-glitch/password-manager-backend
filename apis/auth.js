const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');

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

router.post('/signup', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.APP_SECRET, (err, authData) => {
    if (err) {
      return res.status(400).send('Invalid Token');
    }
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          return res.status(409).send('This Email is already registered.'); // Conflict
        }
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            const newUser = new User({
              displayName: req.body.displayName,
              email: req.body.email,
              password: hash,
              accessToken: req.token
            });
            newUser.save()
              .then(response => {
                if (response) {
                  res.status(200).send('Account created successfully.');
                }
              })
              .catch(err => {
                console.log(err);
                res.sendStatus(500);
              });
          });
        });
      });
  });
});

module.exports = router;