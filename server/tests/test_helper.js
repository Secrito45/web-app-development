const RecipeModel = require('../models/recipe');
const UserModel = require('../models/user');

const recipesInDB = async () => {
  const recipes = await RecipeModel.find({});
  return recipes.map(r => r.toJSON())
};

const getUserByName = async (name) => {
  const user = UserModel.find({ username: name});
  return user.map(u => u.toJSON());
};

const usersInDB = async () => {
  const users = await UserModel.find({});
  //console.log(users);

  return users.map(u => u.toJSON());
};

module.exports = {
  recipesInDB,
  getUserByName,
  usersInDB,
};