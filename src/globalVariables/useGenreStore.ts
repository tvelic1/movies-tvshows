import {create} from 'zustand';
import { GenreDetails,GenreState } from '../interfacess/GenreInterface';

export const useGenreStore = create<GenreState>((set) => ({
  genres: [],
  setGenres: (newGenres: GenreDetails[]) => 
    set({ genres: newGenres }),
  
}));