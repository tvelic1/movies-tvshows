import React, { useEffect, useState } from 'react'
import { fetchGenres, fetchSearchMovies, fetchSearchVideo } from '../fetchData/api';
import { useNavigate, useParams } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import ShowStore from '../globalVariables/ShowStore';
import { useGenreStore } from '../globalVariables/useGenreStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function TVshowdetails() {
    const { selectedShow } = ShowStore();
    const { genres, setGenres } = useGenreStore();
  const navigate=useNavigate();
    const getGenreNames = (genre_ids: number[]=[]): string[] => {
      return genre_ids.map(id => genres.find(genres => genres.id === id)?.name || "");
    };
  
    const { id } = useParams<{ id: string }>();
    const [key, setKey] = useState<string>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const movieData = await fetchSearchVideo(Number(id));
                    setKey(movieData)
                }
                //setMovies(movieData);
                // I could use global variable here also but I wanted to show this way
            } catch (error) {
                console.error('Failed to fetch movie:', error);
            }

            try {
                const genreData = await fetchGenres();
                setGenres(genreData)
              } catch (error) {
                console.error('Failed to fetch movie:', error);
              }

        };
        fetchData();

    }, []);


    return (
        <div className="movie-details">
           <button className="back-button" onClick={() => navigate('/tvshows')}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
            <h1 style={{textAlign:'center'}}>{selectedShow?.name}</h1>
            <div className="movie-info">
                <VideoPlayer videoKey={key||''}></VideoPlayer>
                <p><strong>Overview:</strong> {selectedShow?.overview}</p>
                <p><strong>Genres:</strong> {getGenreNames(selectedShow?.genre_ids).join(', ')}</p>
                <p><strong>Rating:</strong> {selectedShow?.vote_average} / 10</p>
            </div>
        </div>
    );
}

export default TVshowdetails