import {create} from 'zustand';
import { MovieDetails } from '../interfaces/MovieInterface';
 
  interface IMovieStore {
    selectedMovie: MovieDetails | null;
    setSelectedMovie: (movie: MovieDetails) => void;
    
  }
  
  const MovieStore = create<IMovieStore>((set) => {
    const initialMovie = localStorage.getItem('selected')
      ? JSON.parse(localStorage.getItem('selected') || '{}')
      : null;
  
    return {
      selectedMovie: initialMovie,
      setSelectedMovie: (movie: MovieDetails) => {
        set({ selectedMovie: movie });
        localStorage.setItem('selected', JSON.stringify(movie));
      },
     
    };
  });
  export default MovieStore;