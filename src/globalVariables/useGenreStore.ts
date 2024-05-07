import {create} from 'zustand';
interface GenreDetails{
    name:string,
    id:number
}


interface GenreState {
  genres: GenreDetails[];
  setGenres: (newGenres: GenreDetails[]) => void;
}

export const useGenreStore = create<GenreState>((set) => ({
  genres: [],
  setGenres: (newGenres: GenreDetails[]) => 
    set({ genres: newGenres }),
  
  
}));