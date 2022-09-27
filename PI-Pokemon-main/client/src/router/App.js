import '../styles/App.css';
import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import Landing from '../components/LandingPage';
import NavBar from '../components/NavBar';
import Home from '../components/Home';
import CreatePokemon from '../components/CreatePokemon';
import PokemonDetail from '../components/PokemonDetail';
// import Filter from '../components/Filter';


function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Route exact path={'/'} component={Landing} />
        <Route path={'/n'} component={NavBar} />
        <Route exact path={'/n/home'} component={Home} />
        <Route path={'/n/detail/:name'} component={PokemonDetail} />
        <Route path={'/n/create'} component={CreatePokemon} />
        {/* <Route path={'/n/home/:type'} component={Filter} /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;