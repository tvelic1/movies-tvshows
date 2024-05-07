import React, { useEffect } from 'react'
import '../css/MovieDetails.css';
import MovieStore from '../globalVariables/MovieStore';
import { useGenreStore } from '../globalVariables/useGenreStore';
import {fetchGenres}  from '../fetchData/api';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


function MovieDetails() {
  const { selectedMovie } = MovieStore();
  const { genres, setGenres } = useGenreStore();
const navigate=useNavigate();
  const getGenreNames = (genre_ids: number[]): string[] => {
    return genre_ids.map(id => genres.find(genres => genres.id === id)?.name || "");
  };


  useEffect(() => { //in case of refreshing the page, we could use localStorage in globalVariables, but this is also solution
    const fetchData = async () => {
      try {
        const genreData = await fetchGenres();
        setGenres(genreData)
      } catch (error) {
        console.error('Failed to fetch movie:', error);
      }
    }
    fetchData();
  }, [])
  


  if (!selectedMovie) {
    return <div>No movie selected.</div>;
  }

  return (
    <div className="movie-details">
       <button className="back-button" onClick={() => navigate('/')}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
        <h1 style={{textAlign:'center'}}>{selectedMovie.title}</h1>
        <div className="movie-info">
            <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} alt={selectedMovie.title} />
            <p><strong>Overview:</strong> {selectedMovie.overview}</p>
            <p><strong>Genres:</strong> {getGenreNames(selectedMovie.genre_ids).join(', ')}</p>
            <p><strong>Rating:</strong> {selectedMovie.vote_average} / 10</p>
        </div>
    </div>
);
}

export default MovieDetails;