import React, { useState } from 'react';

const NewRecipeEditor = (recipes, setRecipes) => {
  const [recipeMethod, setRecipeMethod] = useState('');
  const [ingredients, setIngredients] = useState([ '', '', '' ]);
  const [newRecipeName, setNewRecipeName] = useState('');

  const addNewRecipe = event => {
    event.preventDefault();

    const dropEmptyFrom = (targeList) => {
      let cleanedList = [];
      targeList.forEach(item => {
        if (item !== '') {
          cleanedList.push(item);
        }  
      });

      return cleanedList;
    };

    const newRecipeObject = {
      id: recipes.length + 1 ,
      url: undefined,
      name: newRecipeName,
      method: recipeMethod,
      ingredients: dropEmptyFrom(ingredients)
    }

    setRecipes(recipes.concat(newRecipeObject));

    setRecipeMethod('');
    setIngredients([ '', '', '' ]);
    setNewRecipeName('');
  };

  const handleFieldChange = event => {
    setIngredients(ingredients.map((item, i) => 
      i !== Number(event.target.id)
      ? item 
      : event.target.value 
    ));
  };

  const handleMethodChange = event => {
    setRecipeMethod(event.target.value);
  };

  const editIngredientFields = (option) => {
    if (option === 'add') {
      setIngredients(ingredients.concat( '' ));
    } else if (option === 'drop') {
      setIngredients(ingredients.slice(0, ingredients.length - 1));
    }
  };

  const handleRecipeNameChange = event => {
    setNewRecipeName(event.target.value);
  };

  return (
    <form onSubmit={addNewRecipe}>
      <h3>Luo uusi resepti</h3>

      Nimi uudelle reseptille <br />
      <input value={newRecipeName}
      onChange={handleRecipeNameChange} 
      /> <br />

      Raaka-aineet <br />
      <button type='button' onClick={() => editIngredientFields('add')} >
        Lisää uusi kenttä
      </button>
      <button type='button' onClick={() => editIngredientFields('drop')} >
        Poista kenttä
      </button> <br /><br />

      {ingredients.map( (item, i) =>
        <div key={i}>
          {i + 1}
          <input
            value={item}
            id={i}
            onChange={handleFieldChange}
          /> <br />
        </div>
      )}

      <br />
      
      Valmistusohje <br />
      <textarea 
      value={recipeMethod} 
      onChange={handleMethodChange} 
      /> <br /> <br />
      
      <button type='submit'>Tallenna</button>
    </form>
  );
};

export default NewRecipeEditor;