import { GenreDetails } from "./GenreInterface";

export interface TVShowDetails {
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    vote_average: number;
    vote_count:number;
    popularity:number;
    genres:GenreDetails[];
    status:string;
    first_air_date:string;

  }
  
  export interface ITVShow {
    results: TVShowDetails[];
  }