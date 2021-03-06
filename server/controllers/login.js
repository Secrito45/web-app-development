const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const UserModel = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const body = req.body;

  console.log('New login detected');

  const user = await UserModel.findOne({ username: body.username });
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'Invalid username or password'
    })
  }

  console.log('Credentials were valid');

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = await jwt.sign(userForToken, process.env.SECRET);
  
  res.status(200).send({
    token,
    username: user.username
  });
});

module.exports = loginRouter;