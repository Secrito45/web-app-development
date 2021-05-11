import React, {useState} from 'react';

import NewRecipeEditor from './NewRecipeEditor';

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

export default RecipeView;