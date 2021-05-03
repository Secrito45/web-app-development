const mongoose = require('mongoose');
const database = 'recipebook'
const uri = `mongodb://localhost/${database}`;

mongoose.connect(uri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: false, 
  useCreateIndex: true 
});

const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: Array,
  method: String,
  url: String,
});

const RecipeModel = mongoose.model('RecipeModel', recipeSchema);

const testRecipe = new RecipeModel({
  name: 'Lisää reseptejä',
  ingredients: [],
  url: '',
  method: '',
})

testRecipe.save().then(res => {
  console.log(res);
  mongoose.connection.close();
});