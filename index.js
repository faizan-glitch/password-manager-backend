const express = require('express');
const app = express();
const authAPI = require('./apis/auth');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

// Parse JSON data from the body of requests
app.use(bodyParser.json());

// Set the Authentication API
app.use('/auth', authAPI);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => app.listen(PORT, console.log(`Server running on port: ${PORT} `)))
  .catch(err => console.log(err));
