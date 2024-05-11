import { create } from 'zustand';

interface StoreState {
  search: string;
  setSearch: (newSearch: string) => void;
  moviesOrShowsFromSearch: boolean
  setFromSearch: (search: boolean) => void;
}

const useStore = create<StoreState>((set) => {
  const initialSearch = sessionStorage.getItem('search') || '';
  return {
    search: initialSearch,
    setSearch: (newSearch: string) => {
      set({ search: newSearch });
      sessionStorage.setItem('search', newSearch);
    }, 
    moviesOrShowsFromSearch: true,
    setFromSearch: (fromSearch: boolean) => set({ moviesOrShowsFromSearch: fromSearch }),
  };
});

export default useStore;


