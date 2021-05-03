import React, { useState, useEffect } from 'react';
import axios from 'axios';

import NewRecipeEditor from './components/NewRecipeEditor';

const RecipeItem = ({ item, handleClick }) => {
  const action = () => { 
    //console.log(item);
    handleClick(item);
  };

  return (
    <li>
      <button onClick={action}>{ item.name }</button>
    </li>
  );
};
/* Component to render information from the selected recipe */
const RecipeView = ({ item, handleAction, handleDelete}) => {

  //const ingredientList = item.ingredients;
  //const urlToRecipe = item.url;
  //const method = item.method;

  const [activeItem, setActiveItem] = useState(item);
  const [editRecipe, setEditRecipe] = useState(false);

  const closeAndUpdate = updatedItem => {
    setActiveItem(updatedItem);
    setEditRecipe(false);
  };

  if (editRecipe) return (
    <div>
      <NewRecipeEditor 
      initial={activeItem}
      headerLabel='Reseptin muokkaus'
      handleAction={handleAction}
      handleClose={closeAndUpdate} />
    </div>
  );

  console.log(activeItem.ingredients);
  
  // NOTE: works because if activeItem.ingredients eq false the AND operation
  //       is not checked
  if ( activeItem.ingredients && activeItem.ingredients.length > 0 ) return (
    <div>
      <h1>{activeItem.name}</h1>
      <h2>Raaka-aineet</h2>
      <ul>
        {
          activeItem.ingredients.map((ingredient, i) => 
          <li key={i}>
            {ingredient}
          </li>
        )}
      </ul>
      <h2>Valmistusohje</h2>
      <p>
        {activeItem.method}
      </p>

      <button onClick={ () => setEditRecipe(true) }>
        Muokkaa
      </button>
      <button onClick={() => handleDelete(activeItem.id)}>
        Poista resepti
      </button>

    </div>
  );

  if (activeItem.url) return (
    <div>
      <h1>{activeItem.name}</h1>
      <h2>Linkki kolmannenosapuolen ohjeeseen</h2>
      <a href={activeItem.url}> 
        <p>Linkki ulkoiseen ohjeeseen</p>
      </a>

      <button onClick={ () => setEditRecipe(true) }>
        Muokkaa
      </button>
      <button onClick={() => handleDelete(activeItem.id)}>
        Poista resepti
      </button>
    
    </div>
  );

  return (
    <div>

      <h1>{activeItem.name}</h1>
      <h2>Raaka-aineet</h2>
      <p>Ei saatavilla</p>
      <h2>Valmistusohje</h2>
      <p>Ei saatavilla</p>
      <h2>Linkki kolmannenosapuolen ohjeeseen</h2>
      <p> Ei saatavilla </p>

      <button onClick={ () => setEditRecipe(true) }>
        Muokkaa
      </button>
      <button onClick={() => handleDelete(activeItem.id)}>
        Poista resepti
      </button>

    </div>
  );
};


const App = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [createNew, setCreateNew] = useState(false);
  const [showRecipe, setShowRecipe] = useState(false);
  const [itemToShow, setItemToShow] = useState();

  const baseURI = 'http://localhost:3001';

  /* Componet effects */

  useEffect(() => {
    console.log('App Component Effect')
    axios.get(baseURI + '/api/recipes')
    .then(res => {
      console.log('Promise fulfilled');
      setRecipes(res.data);
    });
  }, []);

  console.log('Render ' + recipes.length + ' recipes');

  /* Recipe editing related actions */

  const addNewRecipe = newRecipeObject => {
    //newRecipeObject = {...newRecipeObject, id: recipes.length + 1 };
    console.log(newRecipeObject);
    axios.post(baseURI + '/api/recipes', newRecipeObject)
    .then(res => {
      const newRecipe = res.data;
      console.log(newRecipe);
      setRecipes(recipes.concat(newRecipe));
    });
  }

  const updateRecipe = newRecipeObject => {
    const id = newRecipeObject.id;
    axios.put(baseURI + '/api/recipes/' + id, newRecipeObject)
    .then(res => {
      console.log(res.data);
      setRecipes(recipes.map(recipe =>
        recipe.id !== id 
        ? recipe 
        : newRecipeObject));
    });
  };

  const deleteRecipe = id => {
    axios.delete(baseURI + '/api/recipes/' + id)
    .then(result => {
      setRecipes(recipes.filter(r => r.id !== id));
      setShowRecipe(false);
    });
  };

  // App's actions
  const selectRecipe = (item) => {
    setItemToShow(item);
    setShowRecipe(true);
  };

  /* APP rendering */

  // Display Recipe editor
  if (createNew) return (
    <div> 
      <button onClick={ () => setCreateNew(false) }>
        Takaisin
      </button>
      
      <NewRecipeEditor
        headerLabel='Lisää uusi resepti'
        handleAction={addNewRecipe}
        handleClose={() => setCreateNew(false)}
      />
    </div>
  );

  // Display selected recipe
  if (showRecipe) return (
    <div>
      <button onClick={() => setShowRecipe(false)} >
        Takaisin
      </button>
      <RecipeView item={itemToShow}
        handleAction={updateRecipe}
        handleClose={() => setShowRecipe(false)}
        handleDelete={deleteRecipe}
      />
    </div>
  );
  
  // List all available recipes
  return (
    <div>
      <h1>Reseptikirja</h1>

      <ul>
        {recipes.map(item => 
          <RecipeItem key={item.id} item={item} 
          handleClick={selectRecipe} />
        )}
      </ul>
      <button onClick={ () => setCreateNew(true) }>
        Luo uusi resepti
      </button>
    </div>
  );
};

export default App;