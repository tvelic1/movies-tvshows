import React, { useEffect, useState } from 'react';
import { fetchTVshows, fetchSearchShows } from '../fetchData/api';
import { useNavigate } from 'react-router-dom';
import '../css/MovieTVShowFeed.css';
import useStore from '../globalVariables/useStore';
import ShowStore from '../globalVariables/ShowStore';
import { ITVShow } from '../Interfaces/TVShowInterface';


const TVShows = () => {

  const { setSelectedShow } = ShowStore();
  const navigate = useNavigate();

  const [tvshow, setTVShow] = useState<ITVShow | null>(null);
  const { moviesFromSearch, setFromSearch } = useStore();
  const { search, setSearch } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieData = await fetchTVshows();
        setTVShow(movieData)
        localStorage.setItem('topTenShows', JSON.stringify(movieData))
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

        const storedMovies = localStorage.getItem('topTenShows');

        if (storedMovies) {
          
          setTVShow(JSON.parse(storedMovies));
          setFromSearch(false);
          return;
        }
      }

      try {
        const movieData = await fetchSearchShows(search);
        if (search.length > 2) {
          setTVShow(movieData)
          setFromSearch(true);

        }
      } catch (error) {
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
      placeholder="Search TV shows..."
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
    {!moviesFromSearch && <h3 id='title'>TOP 10 TV Shows of all time</h3>}
    <div className="movie-feed">


      {tvshow && 
        (moviesFromSearch
          ? tvshow.results.filter(show => show.poster_path).sort((a, b) => b.vote_average - a.vote_average)
          : tvshow.results.slice(0, 10))
      .map((movie, index) => (
        <div key={index} className="movie-card"

          onClick={() => {
            setSelectedShow(movie); navigate(`/tvshows/${movie.id}`)
          }} >

          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.name} />
          <h2 style={{textAlign:'center'}} title={movie.name}>{movie.name}</h2>
        </div>
      ))}
    </div>
  </>
  );
};

export default TVShows;
