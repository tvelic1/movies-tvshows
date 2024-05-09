import React, { useEffect, useState } from 'react';
import { fetchMovie, fetchSearchMovies } from '../fetchData/api';
import { useNavigate } from 'react-router-dom';
import '../css/MovieTVShowFeed.css';
import useStore from '../globalVariables/useStore';
import MovieStore from '../globalVariables/MovieStore';
import { IMovie } from '../interfaces/MovieInterface';



const MovieComponent = () => {

  const navigate = useNavigate();
  const [movies, setMovies] = useState<IMovie | null>(null);
  const { setSelectedMovie } = MovieStore();
  const { moviesOrShowsFromSearch, setFromSearch } = useStore();
  const { search, setSearch } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieData = await fetchMovie();
        setMovies(movieData);
        localStorage.setItem('topTen', JSON.stringify(movieData));
        setFromSearch(false); // I could use global variable here also but I wanted to show this way
      } catch (error) {
        console.error('Failed to fetch movie:', error);
      }

    };

    if (search.length < 3)
      fetchData();

  }, [search.length, setFromSearch]);


  useEffect(() => {

    const fetchData = async () => {
      if (search.length < 3) {

        const storedMovies = localStorage.getItem('topTen');

        if (storedMovies) {

          setMovies(JSON.parse(storedMovies));
          setFromSearch(false);
          return;
        }
      }

      try {
        const movieData = await fetchSearchMovies(search);

        if (search.length > 2) {

          setMovies(movieData)
          setFromSearch(true);

        }
      }
      catch (error) {

        console.error('Failed to fetch movie:', error);
      }

    };

    //setTimeout(fetchData,1000);

    fetchData();


  }, [search, setFromSearch])

  return (<>

    <input
      id='inputSearch'
      type="text"
      placeholder="Search movies..."
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
    {!moviesOrShowsFromSearch && <h3 id='title'>TOP 10 Movies of all time</h3>}
    <div className="movie-feed">

      {movies && (
        moviesOrShowsFromSearch
          ? movies.results.filter(movie => movie.poster_path).sort((a, b) => b.vote_average - a.vote_average)
          : movies.results.slice(0, 10)
      ).map((movie, index) => (
        <div
          key={index}
          className={`movie-card ${movie.vote_average > 8 ? 'recommended' : ''}`}
          onClick={() => { setSelectedMovie(movie); navigate(`/movies/${movie.id}`) }}>
            
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <h2 style={{ textAlign: 'center' }} title={movie.title}>{movie.title}</h2>
        </div>
      ))}
    </div>
  </>
  );
};

export default MovieComponent;
