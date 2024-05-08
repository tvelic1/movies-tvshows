import React, { useEffect, useState } from 'react';
import { fetchTVshows, fetchSearchShows} from '../fetchData/api';
import { useNavigate } from 'react-router-dom';
import '../css/MovieFeed.css';
import useStore from '../globalVariables/useStore';
import ShowStore from '../globalVariables/ShowStore';

interface TVShowDetails {
  id: number;
  name: string;
  overview: string;
  genre_ids: number[];
  poster_path: string;
  vote_average: number;
}



interface TVShow {
  results: TVShowDetails[];
}


const truncate = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.substring(0, maxLength - 3) + "..." : text;
};

const TVShows = () => {

  const {setSelectedShow} = ShowStore();
  const navigate = useNavigate();

  const [tvshow, setTVShow] = useState<TVShow | null>(null);
  const { moviesFromSearch,setFromSearch } = useStore();
  const { search, setSearch } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieData = await fetchTVshows();
        setTVShow(movieData)
        console.log(tvshow)

        localStorage.setItem('topTenShows',JSON.stringify(movieData))
        setFromSearch(false); // I could use global variable here also but I wanted to show this way
      } catch (error) {
        console.error('Failed to fetch movie:', error);
      }
      
    };
    if (search.length < 3)
      fetchData();

  },[search.length,setFromSearch,tvshow]);


  useEffect(() => {

    const fetchData = async () => {
      if (search === '' || search.length < 3) {
        const storedMovies = localStorage.getItem('topTenShows');
        if (storedMovies) {
          setTVShow(JSON.parse(storedMovies));
          console.log(tvshow)
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


  }, [search,setFromSearch,tvshow])

  return (<>

    <input
      id='inputSearch'
      type="text"
      placeholder="Search movies..."
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
    {!moviesFromSearch && <h3 id='title'>TOP 10 TV Shows of all time</h3>}
    <div className="movie-feed">

     
      {tvshow &&  (
          moviesFromSearch
            ? tvshow.results.sort((a, b) => b.vote_average - a.vote_average)
            : tvshow.results.slice(0, 10)
        ).map((movie, index) => (
        <div key={index} className="movie-card" onClick={()=>{ setSelectedShow(movie);navigate(`/tvshows/${movie.id}`)}} >
          <h2 title={movie.name}>{truncate(movie.name, 27)}</h2>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.name} />
          <p>Rating: {movie.vote_average}/10</p>
        </div>
      ))}
    </div>
  </>
  );
};

export default TVShows;
