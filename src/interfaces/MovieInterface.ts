import { GenreDetails } from "./GenreInterface";

export interface MovieDetails {
    id: number;
    title: string;
    overview: string;
    genre_ids: number[];
    poster_path: string;
    vote_average: number;
    vote_count:number;
    popularity:number;
    release_date:string;
    name:string;
    genres:GenreDetails[]
  }
  
  export interface IMovie {
    results: MovieDetails[];
  }