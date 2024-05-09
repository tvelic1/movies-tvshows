import { GenreDetails } from "./GenreInterface";

export interface TVShowDetails {
    id: number;
    name: string;
    overview: string;
    genre_ids: number[];
    poster_path: string;
    vote_average: number;
    vote_count:number;
    popularity:number;
    release_date:string;
    title:string;
    genres:GenreDetails[]
  }
  
  
  
  export interface ITVShow {
    results: TVShowDetails[];
  }