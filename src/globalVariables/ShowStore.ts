import {create} from 'zustand';


interface ShowDetails {
    id: number;
    name: string;
    overview: string;
    genre_ids: number[];
    vote_average: number;
  }
 
  interface IShowStore {
    selectedShow: ShowDetails | null;
    setSelectedShow: (show: ShowDetails) => void;
    

  }
  
  const ShowStore = create<IShowStore>((set) => {
    const initialShow = localStorage.getItem('selectedVideo')
      ? JSON.parse(localStorage.getItem('selectedVideo') || '{}')
      : null;
  
    return {
      selectedShow: initialShow,
      setSelectedShow: (show: ShowDetails) => {
        set({ selectedShow: show });
        localStorage.setItem('selectedVideo', JSON.stringify(show));
      },
     
    };
  });
  export default ShowStore;