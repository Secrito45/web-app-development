import React, { useState } from 'react';

const NewRecipeEditor = ({initial, headerLabel, handleAction, handleClose}) => {

  let initMethode = undefined;
  let initIngredients = undefined;
  let initName = undefined;
  let initId = undefined;
  let initURL = undefined;

  if (initial) {  
    initMethode = initial.method;
    initIngredients = initial.ingredients;
    initName = initial.name;
    initId = initial.id;
    initURL = initial.url;
  }

  const [recipeMethod, setRecipeMethod] = useState(initMethode ? initMethode : '');
  const [ingredients, setIngredients] = useState(initIngredients ? initIngredients : [ '', '', '' ]);
  const [recipeName, setRecipeName] = useState(initName ? initName : '');
  const [externalURL, setExternalURL] = useState(initURL ? initURL : '');
  //const [useExternal, setUseExternal] = useState(false);

  const dropEmptyFrom = (targeList) => {
    let cleanedList = [];
    
    targeList.forEach(item => {
      if (item !== '') {
        cleanedList.push(item);
      }  
    });

    return cleanedList;
  };

  const addNewRecipe = event => {
    event.preventDefault();

    if (recipeName === '') {
      alert('Reseptillä täytyy olla nimi!');
      return
    }

    const newRecipeObject = {
      id: initId,
      url: externalURL,
      name: recipeName,
      method: recipeMethod,
      ingredients: dropEmptyFrom(ingredients)
    }

    handleAction(newRecipeObject);

    setRecipeMethod('');
    setIngredients([ '', '', '' ]);
    setRecipeName('');
    handleClose(newRecipeObject);
  };

  const handleFieldChange = event => {
    setIngredients(ingredients.map((item, i) => 
      i !== Number(event.target.id)
      ? item 
      : event.target.value 
    ));
  };


  const handleChange = event => {
    switch (event.target.name) {
      case 'method':
        setRecipeMethod(event.target.value);
        break;

      case 'name':
        setRecipeName(event.target.value)
        break;
    
      case 'url':
        setExternalURL(event.target.value)
        break;
      default:
        break;
    }
  };


  const editIngredientFields = (option) => {
    if (option === 'add') {
      setIngredients(ingredients.concat( '' ));
    } else if (option === 'drop') {
      setIngredients(ingredients.slice(0, ingredients.length - 1));
    }
  };

  return (
    <form onSubmit={addNewRecipe}>
      <h3>{headerLabel}</h3>

      <p>Reseptin nimi</p>
      <input value={recipeName}
      name='name'
      onChange={handleChange} 
      /> <br />

    <p>Raaka-aineet</p>
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
      
      <p>Valmistusohje</p>
      <textarea 
        value={recipeMethod}
        name='method'
        onChange={handleChange} 
      /> <br />

      <p>Lisää linkki ohjeenseen</p>
      <input value={externalURL}
      name='url'
      onChange={handleChange} 
      /> <br /> <br />
      
      <button type='submit'>Tallenna</button>
    </form>
  );
};

export default NewRecipeEditor;