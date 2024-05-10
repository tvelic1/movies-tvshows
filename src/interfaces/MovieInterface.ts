import { GenreDetails } from "./GenreInterface";

export interface MovieDetails {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    vote_average: number;
    vote_count:number;
    popularity:number;
    release_date:string;
    name:string;
    genres:GenreDetails[]
    status:string;
    first_air_date:string;
  }
  
  export interface IMovie {
    results: MovieDetails[];
  }