const recipesRouter = require('express').Router();
const jws = require('jsonwebtoken');

const RecipeModel = require('../models/recipe');
const UserModel = require('../models/user');


const getTokenFrom = req => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

// Return all recipes
recipesRouter.get('/', (req, res) => {
  const token = getTokenFrom(req);
  const decodedToken = jws.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return res.status(401).json({
      error: 'token missing or invalid'
    });
  }

  RecipeModel.find({user: decodedToken.id})
  .then(recipes => {
    res.json(recipes);
  });
});

// Add new recipe
recipesRouter.post('/', async (req, res) => {
  const body = req.body;
  const token = getTokenFrom(req);
  const decodedToken = await jws.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return res.status(401).json({
      error: 'token missing or invalid'
    });
  }
  const user = await UserModel.findById(decodedToken.id);

  const newRecipe = RecipeModel({
    name: body.name,
    ingredients: body.ingredients,
    method: body.method,
    url: body.url,
    user: user._id
  });

  const savedRecipe = await newRecipe.save();

  console.log(body);
  console.log('Save query returned: ' + savedRecipe);

  user.recipes = user.recipes.concat(savedRecipe._id);
  await user.save();

  res.json(savedRecipe.toJSON());
});

// Update recipe
recipesRouter.put('/:id', (req, res) => {
  const body = req.body;
  const token = getTokenFrom(req);
  const decodedToken = jws.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return res.status(401).json({
      error: 'token missing or invalid'
    });
  }

  // Base JSON to use in the update
  const recipe = {
    name: body.name,
    ingredients: body.ingredients,
    method: body.method,
    url: body.url,
    user: decodedToken.id
  };

  RecipeModel.findByIdAndUpdate(req.params.id, recipe, { new: true })
  .then(updatedRecipe => {
    console.log('Update query returned: ' + updatedRecipe);
    res.json(updatedRecipe);
  })

});
  
recipesRouter.delete('/:id', (req, res) => {
  RecipeModel.findByIdAndDelete(req.params.id)
  .then(result => {
    console.log(result + '\nWas deleted succesfully');
    res.status(204).end();
  });
});

/*recipesRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  const recipe = recipes.find(r => r.id === id);
  res.json(recipe);
});*/

module.exports = recipesRouter;