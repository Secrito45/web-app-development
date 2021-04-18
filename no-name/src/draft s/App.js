import React, { useState } from 'react';

import './styles/Navigationbar.css'

// components


// Main App
const App  = (props) => {
  const [recipes, setRecipes] = useState(props.recipes);

  const [isVisible, setVisibility] = useState(true);

  const foo = () => {
    console.log('Menu button was pressed');
    setVisibility(!isVisible);
    console.log('State of isVisible set to', isVisible);
  };

  const navMenuItems = [
    <MenuItem key='1' name='Aloitussivu' handleClick={(foo)} />,
    <MenuItem key='2' name='Reseptikirja' handleClick={foo} />,
    <MenuItem key='3' name='Tietoja' handleClick={foo} />,
    <MenuItem key='4' name='Kirjautuminen' handleClick={foo} />,
  ];

  const recipeList = () => {
    return (
      <div>
      <h1>Reseptikirja</h1>
      <ul>
        {recipes.map(item => 
          <RecipeItem key={item.id} item={item} />
        )}
      </ul>
      </div>
    );
  };

  const recipeView = () => {

  };

  return (
    <div>
      <Navigationbar menuItems={navMenuItems} />

      {isVisible === true && recipeList()}
      
    </div>
  );
};

const Navigationbar = ({ menuItems }) => {

  return (
    <div className='NavBar' >
      <ul>
        {menuItems.map(item => item)}
      </ul>
    </div>
  );
};

const MenuItem = ({ name, handleClick }) => {
  return (
    <li>
      <button onClick={handleClick}>
        {name}
      </button> 
    </li>
  );
};

export default App;
