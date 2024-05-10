import { MovieDetails } from "./MovieInterface";

export interface IMediaDetails extends MovieDetails{
    name:string,
    first_air_date:string;
}

export interface IMedia{
    results: IMediaDetails[];
}