import axios from "axios";
import { IMovie, MovieDetails } from "../interfaces/MovieInterface";
import { ITVShow, TVShowDetails } from "../interfaces/TVShowInterface";
import { IVideoResponse } from "../interfaces/VideoInterface";

export type SequenceOfMoviesOrTVShows = IMovie | ITVShow | null | undefined;
export type MovieOrTVShow=MovieDetails | TVShowDetails | null | undefined;



const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.REACT_APP_API_KEY,
  },
});

export const fetchMoviesOrTvshows = async (
  type: "movie" | "tv"
): Promise<SequenceOfMoviesOrTVShows> => {
  try {
    const response = await api.get(`/${type}/top_rated?language=en-US&page=1`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    throw error;
  }
};

export const fetchSearch = async (
  name: string,
  type: "movie" | "tv"
): Promise<SequenceOfMoviesOrTVShows> => {
  try {
    const response = await api.get(
      `/search/${type}?query=${name}&include_adult=false&language=en-US&page=1`
    );
    if (response) return response.data;
    return null;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    throw error;
  }
};

export const fetchSearchVideo = async (
  name: string,
  id: string
): Promise<IVideoResponse[] | null> => {
  try {
    const response = await api.get(`/${name}/${id}/videos?language=en-US`);
    if (response) return response?.data?.results;
    return null;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    throw error;
  }
};

export const fetchFindById = async (
  name: string,
  id: string
): Promise<MovieOrTVShow> => {
  try {
    const response = await api.get(`/${name}/${id}?language=en-US`);
    if (response) return response.data;
    return null;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    throw error;
  }
};
