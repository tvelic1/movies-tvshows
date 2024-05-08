import React from 'react';
import useStore from '../globalVariables/useStore';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
import '../css/App.css';
import MovieComponent from './MovieComponent';
import MovieDetails from './MovieDetails';
import TVShows from './TVShows';
import TVshowdetails from './TVshowdetails';
import Navbar from './Navbar';

function App() {
  return (
    <Router>
      <div>
      <nav>
         
          <Navbar/>
        </nav>

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<TVShows />} />
          <Route path="/details" element={<MovieDetails />} />
          <Route path="/movies" element={<MovieComponent />} />
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
