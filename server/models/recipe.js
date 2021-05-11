const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: String,
    ingredients: Array,
    method: String,
    url: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }
  });
  
  recipeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  const RecipeModel = mongoose.model('RecipeModel', recipeSchema);

  module.exports = RecipeModel;