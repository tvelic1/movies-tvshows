import React, { useEffect } from 'react'
import '../css/MovieDetails.css';
import MovieStore from '../globalVariables/MovieStore';
import { useGenreStore } from '../globalVariables/useGenreStore';
import { fetchGenres } from '../fetchData/api';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


function MovieDetails() {
  const { selectedMovie } = MovieStore();
  const { genres, setGenres } = useGenreStore();
  const navigate = useNavigate();
  const getGenreNames = (genre_ids: number[]): string[] => {
    return genre_ids.map(id => genres.find(genres => genres.id === id)?.name || "");
  };
  const fixDate = (date: string) => {
    const parts = date.split('-');
    const reversedParts = parts.reverse();
    return reversedParts.join('.');
  }

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
  }, [setGenres])



  if (!selectedMovie) {
    return <div>No movie selected.</div>;
  }

  return (
    <div className="movie-details">
      <button className="back-button" onClick={() => navigate('/movies')}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <h1 style={{ textAlign: 'center' }}>{selectedMovie.title}</h1>
      <div className="movie-info">
        <div className="movie-media">
          <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} alt={selectedMovie.title} />
          <div className="movie-stats">
            <p><strong>Vote Count:</strong> {selectedMovie.vote_count}</p>
            <p><strong>Popularity:</strong> {selectedMovie.popularity}</p>
            <p><strong>Release Date:</strong> {fixDate(selectedMovie.release_date)}</p>
          </div>
        </div>
        <p><strong>Overview:</strong> {selectedMovie.overview}</p>
        <div className="genres-rating-container">
          <p className="genres"><strong>Genres:</strong> {getGenreNames(selectedMovie.genre_ids).join(', ')}</p>
          <p className="rating"><strong>Rating:</strong> {selectedMovie.vote_average} / 10</p>
        </div>
      </div>
    </div>
  );

}

export default MovieDetails;