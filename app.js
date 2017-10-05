// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const router = express.Router();
const mongoURL = require('./config/database');

mongoose.Promise = global.Promise;

// Connect to mongoDB database

mongoose.connect(mongoURL.url, { useMongoClient: true, promiseLibrary: global.Promise });
mongoose.connection.on('connected', () => {
  console.log('Connected to database');
});
mongoose.connection.on('error', (err) => {
  console.log(`Database error ${err}`);
});

require("./app/models/User");

//  Serve static files
app.use(express.static(path.join(__dirname, '/public')));
app.use('/bower_components',  express.static( path.join(__dirname, '/bower_components')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// Routing
//Set app to use express backend router
const index = require('./app/routes.js');
// app.use(router);
app.use('/api', index);
// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Configure port
const port = 8080;
// Listen to port
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
