import axios from 'axios';
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.REACT_APP_API_KEY
  }
});


export const fetchMovie = async (): Promise<any> => {
  try {
    const response = await api.get("/movie/top_rated?language=en-US&page=1");
    return response.data;
  } catch (error) {
    console.error('Error fetching movie data:', error);
    throw error;
  }
};

export const fetchGenres = async (): Promise<any> => {
  try {
    const response = await api.get("/genre/movie/list?language=en");
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching movie data:', error);
    throw error;
  }
};

export const fetchSearchMovies = async (name: string): Promise<any> => {
  try {
    const response = await api.get(`/search/movie?query=${name}&include_adult=false&language=en-US&page=1`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie data:', error);
    throw error;
  }
};
export const fetchTVshows = async (): Promise<any> => {
  try {
    const response = await api.get(`/tv/top_rated?language=en-US&page=1`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie data:', error);
    throw error;
  }
};

export const fetchSearchShows = async (name: string): Promise<any> => {
  try {
    const response = await api.get(`/search/tv?query=${name}&include_adult=false&language=en-US&page=1`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie data:', error);
    throw error;
  }
};
export const fetchSearchVideo = async (name: string): Promise<any> => {
  try {
    const response = await api.get(`/tv/${name}/videos?language=en-US`);
    return response?.data?.results[0]?.key;
  } catch (error) {
    console.error('Error fetching movie data:', error);
    throw error;
  }
};



