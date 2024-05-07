import {create} from 'zustand';


interface MovieDetails {
    id: number;
    title: string;
    overview: string;
    genre_ids: number[];
    poster_path: string;
    vote_average: number;
  }
 
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