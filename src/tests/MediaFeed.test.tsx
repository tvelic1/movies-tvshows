import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MediaFeed from '../components/MediaFeed';
import * as api from '../fetchData/api';

jest.mock('../fetchData/api', () => ({
  fetchMoviesOrTvshows: jest.fn(),
  fetchSearch: jest.fn(),
}));

describe('MediaFeed Component for movies', () => {
  const mockType = 'movie';
  const placeholder = 'Search movies';
  const title = 'Top Movies';
  const mockMediaData = {
    results: [
      {
        id: '1',
        title: 'Movie 2',
        poster_path: '/poster1.jpg',
        vote_average: 8.5,
        status:'released',
        overview:'overview...'
      },
      {
        id: '2',
        title: 'Movie 7',
        poster_path: '/poster5.jpg',
        vote_average: 8.7,
        status:'relased',
        overview:'overview....'
      },
    ],
  };

  beforeEach(() => {
    jest.resetAllMocks();
    (api.fetchMoviesOrTvshows as jest.Mock).mockResolvedValue(mockMediaData);
    (api.fetchSearch as jest.Mock).mockResolvedValue(mockMediaData);
  });


  test('fetches and renders movie data successfully', async () => {
    render(
      <BrowserRouter>
        <MediaFeed type={mockType} placeholder={placeholder} title={title} />
      </BrowserRouter>
    );

    await waitFor(() => {

      expect(screen.getByText('Movie 2')).toBeInTheDocument();
      expect(screen.getByText('Movie 7')).toBeInTheDocument();
      
    });
  });


  test('Title and placeholder for movies', async () => {
    render(
      <BrowserRouter>
        <MediaFeed type={mockType} placeholder={placeholder} title={title} />
      </BrowserRouter>
    );

    await waitFor(() => {
    
      expect(screen.getByPlaceholderText('Search movies')).toBeInTheDocument();
      expect(screen.getByText('Top Movies')).toBeInTheDocument();
  
    });
  });

  

});


describe('MediaFeed Component for shows', () => {
  const mockType = 'tv';
  const placeholder = 'Search tvshows';
  const title = 'Top tvshows';
  const mockMediaData = {
    results: [
      {
        id: '7',
        name: 'tvshow 22',
        poster_path: '/poster21.jpg',
        vote_average: 6.5,
        status:'returning series',
        overview:'overview tvshow...'
      },
      {
        id: '9',
        name: 'tvshow 11',
        poster_path: '/poster5.jpg',
        vote_average: 7.7,
        status:'ended',
        overview:'overview show....'
      },
    ],
  };

  beforeEach(() => {
    jest.resetAllMocks();
    (api.fetchMoviesOrTvshows as jest.Mock).mockResolvedValue(mockMediaData);
    (api.fetchSearch as jest.Mock).mockResolvedValue(mockMediaData);
  });


  test('fetches and renders tvshow data successfully', async () => {
    render(
      <BrowserRouter>
        <MediaFeed type={mockType} placeholder={placeholder} title={title} />
      </BrowserRouter>
    );

    await waitFor(() => {

      expect(screen.getByText('tvshow 22')).toBeInTheDocument();
      expect(screen.getByText('tvshow 11')).toBeInTheDocument();
      
    });
  });


  test('Title and placeholder for tvshows', async () => {
    render(
      <BrowserRouter>
        <MediaFeed type={mockType} placeholder={placeholder} title={title} />
      </BrowserRouter>
    );

    await waitFor(() => {
    
      expect(screen.getByPlaceholderText('Search tvshows')).toBeInTheDocument();
      expect(screen.getByText('Top tvshows')).toBeInTheDocument();
  
    });
  });

  

});
