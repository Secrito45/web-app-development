import React, { useState, useEffect } from 'react';
import axios from 'axios';

import loginService from './services/login';
import RecipeView from './components/RecipeView';
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

const App = (props) => {
  const [recipes, setRecipes]       = useState([]);
  const [createNew, setCreateNew]   = useState(false);
  const [showRecipe, setShowRecipe] = useState(false);
  const [itemToShow, setItemToShow] = useState();
  const [username, setUsername]     = useState('');
  const [password, setPassword]     = useState('');
  const [user, setUser]             = useState(null);

  const baseURI = 'http://localhost:3001';

  /* Componet effects */

  // Load recipes from server
  useEffect(() => {
    console.log('App Component Effect');
    if (user === null) {
      console.log('No user logged in');
      return
    }

    const config = {
      headers: { Authorization: `bearer ${user.token}` },
    };

    axios.get(baseURI + '/api/recipes', config)
    .then(res => {
      console.log('Promise fulfilled');
      setRecipes(res.data);
    })
    .catch(error => {
      console.error('Failed to retrieve recipes:', error.message);
    });
  }, [user]);

  useEffect(() => {
    const userString = window.localStorage.getItem('loggedUser');
    if (userString) {
      const user = JSON.parse(userString);
      //console.log('User in storage', user);
      setUser(user);
    }
  }, []);

  console.log('Render ' + recipes.length + ' recipes');

  /* Logging in related handlers */

  const handleLogin = async event => {
    event.preventDefault();

    try {
    const user = await loginService.login({
      username, password
    })

    window.localStorage.setItem('loggedUser', JSON.stringify(user));
    setUser(user);
    setUsername('');
    } catch (exception) {
      console.log('Trying to login with', username, password);
      alert('Wrong credentials');
    }
    setPassword('');
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
    setRecipes([]);
  };

  /* Recipe editing related actions */
  const addNewRecipe = newRecipeObject => {
    const config = {
      headers: { Authorization: `bearer ${user.token}` },
    };

    console.log(newRecipeObject);
    axios.post(baseURI + '/api/recipes', newRecipeObject, config)
    .then(res => {
      const newRecipe = res.data;
      console.log(newRecipe);
      setRecipes(recipes.concat(newRecipe));
    });
  }

  const updateRecipe = newRecipeObject => {
    const config = {
      headers: { Authorization: `bearer ${user.token}` },
    };

    const id = newRecipeObject.id;
    axios.put(baseURI + '/api/recipes/' + id, newRecipeObject, config)
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

  if (user === null) return (
    <div>
      <h2>Kirjaudu sisään palveluun</h2>

      <form onSubmit={handleLogin} >
        <div>
          Käyttäjä
          <input 
          type='text'
          value={username}
          name='username'
          onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Salasana
          <input 
          type='password'
          value={password}
          name='password'
          onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Kirjaudu sisään</button>
      </form>
    </div>
  );

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
      <br />
      <br />
      <button onClick={handleLogout} >Kirjaudu ulos</button>
    </div>
  );
};

export default App;