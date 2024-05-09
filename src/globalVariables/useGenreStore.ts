import {create} from 'zustand';
import { GenreDetails,GenreState } from '../interfaces/GenreInterface';

export const useGenreStore = create<GenreState>((set) => ({
  genres: [],
  setGenres: (newGenres: GenreDetails[]) => 
    set({ genres: newGenres }),
  
}));