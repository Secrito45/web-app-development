import React, { useState } from 'react';

import NewRecipeEditor from './components/NewRecipeEditor';

const RecipeItem = ({ item }) => {
  const action = () => console.log(item);

  return (
    <li>
      <button onClick={action}>{ item.name }</button>
    </li>
  );
};

const App = (props) => {
  const [recipes, setRecipes] = useState(props.recipes);

  //const [] = useState();

  return (
    <div>
      <h1>Reseptikirja</h1>

      <ul>
        {recipes.map(item => 
          <RecipeItem key={item.id} item={item} />
        )}
      </ul>
          
      <NewRecipeEditor
      recipes={recipes}
      setRecipes={setRecipes}
      />
    </div>
  );
};

export default App;