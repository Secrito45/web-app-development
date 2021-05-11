// Backend's main logic
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const conf = require('./utils/config');
const usersRouter = require('./controllers/users');
const recipesRouter = require('./controllers/recipes');
const loginRouter = require('./controllers/login');

//console.log('Connecting to mongoDB')

mongoose.connect(conf.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: false, 
  useCreateIndex: true 
})
.then(res => { // Add promise handler
  //console.log('Connected successfully')
}).catch(error => { // Add exception handler
  console.error('Connecing to Database failed');
});

// Move to middleware.js file. Check FSO part 4-a
const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  // Error handling here

  next(error);
};

// Middleware assignements
app.use(cors());
app.use(express.static('build')); //Use with build frontEnd
app.use(express.json());
// Optionally add requestlogger MW

app.use('/api/login', loginRouter);
app.use('/api/recipes', recipesRouter);
app.use('/api/users', usersRouter);

// Add unknownEndpoint MW
app.use(errorHandler);

module.exports = app;