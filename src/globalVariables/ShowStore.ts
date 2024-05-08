import {create} from 'zustand';
import { TVShowDetails } from '../Interfaces/TVShowInterface';
 
  interface IShowStore {
    selectedShow: TVShowDetails | null;
    setSelectedShow: (show: TVShowDetails) => void;
    

  }
  
  const ShowStore = create<IShowStore>((set) => {
    const initialShow = localStorage.getItem('selectedVideo')
      ? JSON.parse(localStorage.getItem('selectedVideo') || '{}')
      : null;
  
    return {
      selectedShow: initialShow,
      setSelectedShow: (show: TVShowDetails) => {
        set({ selectedShow: show });
        localStorage.setItem('selectedVideo', JSON.stringify(show));
      },
     
    };
  });
  export default ShowStore;