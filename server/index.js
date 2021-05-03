const express = require('express');
const app = express();

app.use(express.json());

const cors = require('cors');
app.use(cors());

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

recipeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const RecipeModel = mongoose.model('RecipeModel', recipeSchema);

let recipeBook = [
  {
    id: 1,
    url: 'https://www.k-ruoka.fi/reseptit/boltsi-pasta',
    name: 'Boltsi pasta'
  },
  {
    id: 2,
    url: '',
    name: 'Spam and eggs',
    method: 'Ota sian- ja naudanliha säilykepurkista ja leikkaa se siivuiksi. Paista säilukesiivut ja kananmunat pannulla öljyssä mausta suolalla ja pippurilla',
    ingredients: [
      '1 tölkki sian- ja naudanliha säilykettä',
      '2 kanan munaa',
      '2 ruokalusikallista öljyä',
      'Suolaa ja pippuria'
    ],
  }
];

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Return all recipes
app.get('/api/recipes', (req, res) => {
  RecipeModel.find({})
  .then(recipes => {
    res.json(recipes);
  });
});

app.get('/api/recipes/:id', (req, res) => {
  const id = req.params.id;
  const recipe = recipes.find(r => r.id === id);
  res.json(recipe);
});

app.post('/api/recipes', (req, res) => {
  const body = req.body;

  const newRecipe = RecipeModel({
    name: body.name,
    ingredients: body.ingredients,
    method: body.method,
    url: body.url
  });

  newRecipe.save()
  .then(savedRecipe => {
    console.log(body);
    console.log('Save query returned: ' + savedRecipe);
    res.json(savedRecipe);
  });
  /*// Add id to the new recipe
  newRecipe = {...newRecipe, id: recipeBook.length + 1};
  console.log(newRecipe);
  // Add new recipe to the recipeBook
  recipeBook = recipeBook.concat(newRecipe);
  res.json(newRecipe);*/
});

app.put('/api/recipes/:id', (req, res) => {
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

app.delete('/api/recipes/:id', (req, res) => {
  RecipeModel.findByIdAndDelete(req.params.id)
  .then(result => {
    console.log(result);
    res.status(204).end();
  });
});
  
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});