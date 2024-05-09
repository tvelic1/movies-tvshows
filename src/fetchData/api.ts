import axios from 'axios';
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.REACT_APP_API_KEY
  }
});


export const fetchMoviesOrTvshows = async (type:'movie'|'tv'): Promise<any> => {
  try {
    const response = await api.get(`/${type}/top_rated?language=en-US&page=1`);
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

export const fetchSearch = async (name: string, type: 'movie' | 'tv'): Promise<any> => {
  try {
    const response = await api.get(`/search/${type}?query=${name}&include_adult=false&language=en-US&page=1`);
    if (response)
      return response.data;
    return null;
  } catch (error) {
    console.error('Error fetching movie data:', error);
  }
};


export const fetchSearchVideo = async (name: string, id: string): Promise<any> => {
  try {
    const response = await api.get(`/${name}/${id}/videos?language=en-US`);
    if (response)
      return response?.data?.results;
    return null;
  } catch (error) {
    console.error('Error fetching movie data:', error);
    throw error;
  }
};

export const fetchFindById = async (name: string, id: string): Promise<any> => {
  try {
    const response = await api.get(`/${name}/${id}?language=en-US`);
    if (response)
      return response.data
    return null
  } catch (error) {
    console.error('Error fetching movie data:', error);
  }
};






