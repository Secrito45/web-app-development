const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();

const UserModel = require('../models/user');


usersRouter.post('/', async (req, res) => {
  const body = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new UserModel({
    username: body.username,
    passwordHash,
  })
  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch(exception) { 
    // Change to use "next" call
    console.log(exception);
    res.status(400).send({ error: 'Username must be unique' });
  }
});

usersRouter.get('/', (req, res) => {
  UserModel.find({}).populate('recipes')
  .then(users => {
    res.json(users.map(u => u.toJSON()));
  });
});

usersRouter.get('/:id', (req, res) => {
  UserModel.findById(req.params.id)
  .then(targetUser => {
    res.json(targetUser.toJSON());
  });
});

module.exports = usersRouter;