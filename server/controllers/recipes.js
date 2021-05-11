const recipesRouter = require('express').Router();

const RecipeModel = require('../models/recipe');
const UserModel = require('../models/user');

// Return all recipes
recipesRouter.get('/', (req, res) => {
  RecipeModel.find({})
  .then(recipes => {
    res.json(recipes);
  });
});
  
recipesRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  const recipe = recipes.find(r => r.id === id);
  res.json(recipe);
});
  
recipesRouter.post('/', async (req, res) => {
  const body = req.body;
  const user = await UserModel.findById(body.userId);

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
  
recipesRouter.put('/:id', (req, res) => {
  const body = req.body;

  // Base JSON to use in the update
  const recipe = {
    name: body.name,
    ingredients: body.ingredients,
    method: body.method,
    url: body.url
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

module.exports = recipesRouter;