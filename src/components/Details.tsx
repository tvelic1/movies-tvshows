import React, { useEffect, useState } from 'react'
import '../css/MovieDetails.css';
import MovieStore from '../globalVariables/MovieStore';
import { useGenreStore } from '../globalVariables/useGenreStore';
import { fetchFindById, fetchGenres, fetchSearchVideo } from '../fetchData/api';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import VideoPlayer from './VideoPlayer';
import { MovieDetails } from '../interfaces/MovieInterface';
import ShowStore from '../globalVariables/ShowStore';
import { TVShowDetails } from '../interfaces/TVShowInterface';



function Details({ id, type }: { id: string, type: 'tv' | 'movie' }) {
    const [selectedMovie, setSelectedMovie] = useState<MovieDetails | TVShowDetails | null>(null);
    const [key, setKey] = useState<string>('');
    const navigate = useNavigate();

    const fixDate = (date: string) => {
        const parts = date.split('-');
        const reversedParts = parts.reverse();
        return reversedParts.join('.');
    }


    useEffect(() => {

        const fetchData = async () => {
            try { 
                await fetchFindById(type, id).then(res => { console.log(res); setSelectedMovie(res) }).catch(e=>console.log(e));

                    const movieData = await fetchSearchVideo(type, id);
                    if (movieData) {
                        movieData.forEach((item: { type: string; key: string }) => {
                            if (item.type === 'Trailer' && item.key) {
                                setKey(item.key);
                            }
                        });
                    }
                    else{
                        setKey('');
                    }

                
            } catch (error) {

                console.error('Failed to fetch video key:', error);
            }

        }
        fetchData();
    }, [id, type])




    return (
        <div className="movie-details">
            {!selectedMovie ? (<h2>There is no {type === 'movie' ? 'movie' : 'TV show'} with this ID</h2>)
                :
                <>
                    <button className="back-button" onClick={() => navigate(type === 'movie' ? '/movies' : '/')}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <h1 style={{ textAlign: 'center' }}>{type === 'movie' ? selectedMovie?.title : selectedMovie?.name}</h1>
                    <div className="movie-info">
                        <div className="movie-media">
                            {key ? <VideoPlayer videoKey={key || ''}></VideoPlayer> :
                                <img src={`https://image.tmdb.org/t/p/w500${selectedMovie?.poster_path}`} alt='' />
                            }
                            <div className="movie-stats">
                                <p><strong>Vote Count:</strong> {selectedMovie?.vote_count}</p>
                                <p><strong>Popularity:</strong> {selectedMovie?.popularity}</p>
                                {type === 'movie' && <p><strong>Release Date:</strong> {fixDate(selectedMovie?.release_date || '')}</p>}
                                <p><strong>Actors:</strong> ...</p>
                                <p><strong>Other potential info:</strong> ...</p>


                            </div>
                        </div>
                        <p><strong>Overview:</strong> {selectedMovie?.overview}</p>
                        <div className="genres-rating-container">
                            <p className="genres">
                                <strong>Genres:</strong> {selectedMovie?.genres.map(genre => genre.name).join(', ')}
                            </p>
                            <p className="rating"><strong>Rating:</strong> {selectedMovie?.vote_average} / 10</p>
                        </div>
                    </div></>}
        </div>
    )
};

export default Details;