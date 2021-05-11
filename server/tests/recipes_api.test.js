const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt');

const app = require('../app');
const RecipeModel = require('../models/recipe');
const UserModel = require('../models/user');

const api = supertest(app)

const helper = require('./test_helper');

beforeEach(async () => {
  await RecipeModel.deleteMany({});
  await UserModel.deleteMany({});

  const passwordHash = await bcrypt.hash('salasana', 10);
  const initUser = new UserModel({
    username: 'testUser',
    passwordHash
  });
  
  await initUser.save();
  console.log('User saved to DB');
});

test('notes are returned as json', async () => {
  await api
    .get('/api/recipes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Adding new note was succesful', async () => {
  const user = await helper.getUserByName('testUser');
  console.log(user);

  const newRecipe = new RecipeModel({
    url: '',
    name: 'First test recipe',
    ingredients: [],
    mehods: ''
  });

  /*await api
  .post*/
});

afterAll(() => {
  mongoose.connection.close()
  console.log('DB connection was closed');
})