import React from 'react';
import useStore from '../globalVariables/useStore';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link, useNavigate, NavLink
} from 'react-router-dom';
import '../css/App.css';
import MovieComponent from './MovieComponent';
import MovieDetails from './MovieDetails';
import TVShows from './TVShows';
import TVshowdetails from './TVshowdetails';

function App() {
  return (
    <Router>
      <div>
      <nav>
          <NavLink to="/" style={({ isActive }) => 
            ({ color: isActive ? 'red' : 'black' })}>
            Movies
          </NavLink>
          <NavLink to="/tvshows" style={({ isActive }) => 
            ({ color: isActive ? 'red' : 'black' })}>
            TV Shows
          </NavLink>
        </nav>

        <Routes>
          <Route path="/movies" element={<Home />} />
          <Route path="/" element={<MovieComponent />} />
          <Route path="/details" element={<MovieDetails />} />
          <Route path="/tvshows" element={<TVShows />} />
          <Route path="/tvshows/:id" element={<TVshowdetails />} />



        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  const navigate=useNavigate();
  const {search,setSearch} =useStore();


  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={()=>navigate('/')}>Click</button>
      <input
      type="text"
      placeholder="Search movies..."
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
    </div>
  );
}

export default App;
