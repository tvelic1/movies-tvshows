import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "../css/App.css";
import MovieComponent from "./MovieComponent";
import MovieDetails from "./MovieDetails";
import TVShows from "./TVShowsComponent";
import TVshowdetails from "./TVshowdetails";
import Navbar from "./Navbar";

function App() {
  return (
    <Router>
      <div>

        <nav>
          <Navbar />
        </nav>

        <Routes>
          <Route path="/" element={<TVShows />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/movie" element={<MovieComponent />} />
          <Route path="/tv/:id" element={<TVshowdetails />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
