export interface TVShowDetails {
    id: number;
    name: string;
    overview: string;
    genre_ids: number[];
    poster_path: string;
    vote_average: number;
  }
  
  
  
  export interface ITVShow {
    results: TVShowDetails[];
  }