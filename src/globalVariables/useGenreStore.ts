import {create} from 'zustand';
import { GenreDetails,GenreState } from '../Interfaces/GenreInterface';

export const useGenreStore = create<GenreState>((set) => ({
  genres: [],
  setGenres: (newGenres: GenreDetails[]) => 
    set({ genres: newGenres }),
  
  
}));