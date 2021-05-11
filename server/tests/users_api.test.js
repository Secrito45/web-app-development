const mongoose = require('mongoose')
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);


const bcrypt = require('bcrypt');
const UserModel = require('../models/user');

const helper = require('./test_helper');

describe('When there is initially one user in database', () => {
  beforeEach(async () => {
    await UserModel.deleteMany({});

    const passwordHash = await bcrypt.hash('salainenSana', 10);
    const user = new UserModel({ username: 'root', passwordHash });

    await user.save();
    //console.log('Save was successful');
  });
  
  test('Adding user with unic username succeeds', async () => {
    const usersAtStart = await helper.usersInDB();

    const newUser = {
      username: 'TestUser',
      password: 'tosisalainenSana'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDB();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('Creation fails with proper error code if user exists', async () => {
    const usersAtStart = await helper.usersInDB();

    const newUser = {
      username: 'root', password: '1234'
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('be unique');

    const usersAtEnd = await helper.usersInDB();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});