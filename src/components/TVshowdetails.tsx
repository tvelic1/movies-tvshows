import React, { useEffect, useState } from 'react'
import { fetchGenres, fetchSearchVideo } from '../fetchData/api';
import { useNavigate, useParams } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import ShowStore from '../globalVariables/ShowStore';
import { useGenreStore } from '../globalVariables/useGenreStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../css/TVshowdetails.css'

function TVshowdetails() {

  const { selectedShow } = ShowStore();
  const { genres, setGenres } = useGenreStore();
  const navigate = useNavigate();
  const getGenreNames = (genre_ids: number[] = []): string[] => {
    return genre_ids.map(id => genres.find(genres => genres.id === id)?.name || "");
  };
  const [error, setError] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [key, setKey] = useState<string>();

  useEffect(() => {

    const fetchData = async () => {
      try {
        if (id) {

          const movieData = await fetchSearchVideo(id);
          setKey(movieData)
        }
        // I could use global variable here also but I wanted to show this way
      } catch (error) {

        console.error('Failed to fetch movie:', error);
        setError(true);
      }

      try {

        const genreData = await fetchGenres();
        setGenres(genreData)

      } catch (error) {
        console.error('Failed to fetch genre:', error);
        setError(true);
      }

    };
    
    fetchData();

  }, [id, setGenres]);

  return (
    <div className="show-details">
      <button className="back-button-show" onClick={() => navigate('/')}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      {error ? (<p>There is no movie with this ID</p>) :
        <>

          <h1 style={{ textAlign: 'center' }}>{selectedShow?.name}</h1>
          <div className="show-info">
            <VideoPlayer videoKey={key || ''}></VideoPlayer>
            <p style={{marginTop:'10px'}}><strong>Overview:</strong> {selectedShow?.overview}</p>
            <p><strong>Genres:</strong> {getGenreNames(selectedShow?.genre_ids).join(', ')}</p>
            <p><strong>Rating:</strong> {selectedShow?.vote_average} / 10</p>
          </div>
        </>}
    </div>
  );
}

export default TVshowdetails