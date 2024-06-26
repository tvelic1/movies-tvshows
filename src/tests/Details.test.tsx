import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, useParams } from 'react-router-dom';
import Details from '../components/Details';
import * as api from '../fetchData/api';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

jest.mock('../fetchData/api', () => ({
  fetchFindById: jest.fn(),
  fetchSearchVideo: jest.fn(),
}));




describe('Details Component', () => {
  const mockId = '123';
  const mockType = 'movie';
  const mockMediaDetails = {
    title: 'Test Movie',
    vote_count: 100,
    popularity: 10,
    release_date: '2020-01-01',
    status: 'Released',
    overview: 'Overview text',
    genres: [{ name: 'Action' }, { name: 'Adventure' }],
    vote_average: 8,
    poster_path: '/test.jpg',
  }; 

  beforeEach(() => {
    jest.resetAllMocks();
    (useParams as jest.Mock).mockReturnValue({ id: mockId });
    (api.fetchFindById as jest.Mock).mockResolvedValue(mockMediaDetails);
    (api.fetchSearchVideo as jest.Mock).mockResolvedValue([{ type: 'Trailer', key: 'abc123' }]);
  });

  test('renders movie details successfully', async () => {
    render(
      <BrowserRouter>
        <Details id={mockId} type={mockType} />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Movie')).toBeInTheDocument();
      expect(screen.getByText('Overview text')).toBeInTheDocument();
      expect(screen.getByText('Action, Adventure')).toBeInTheDocument();
      expect(screen.getByText('8')).toBeInTheDocument();
    });
  });

  test('renders loading state initially for movies', () => {
    render(
      <BrowserRouter>
        <Details id={mockId} type={mockType} />
      </BrowserRouter>
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  
});




describe('Details Component for TVShow', () => {
    const mockId = '123';
    const mockType = 'tv';
    const mockShowDetails = {
      name: 'Test show',
      vote_count: 100,
      popularity: 10,
      first_air_date: '2020-01-01',
      status: 'Released',
      overview: 'Overview text',
      genres: [{ name: 'Action' }, { name: 'Adventure' }],
      vote_average: 8,
      poster_path: '/test.jpg',
    };
    
    beforeEach(() => {
      jest.resetAllMocks();
      (useParams as jest.Mock).mockReturnValue({ id: mockId });
      (api.fetchFindById as jest.Mock).mockResolvedValue(mockShowDetails);
      (api.fetchSearchVideo as jest.Mock).mockResolvedValue([{ type: 'Trailer', key: 'abc1234' }]);
    });
  
    test('renders tvshow details successfully', async () => {
      render(
        <BrowserRouter>
          <Details id={mockId} type={mockType} />
        </BrowserRouter>
      );
  
      await waitFor(() => {
        expect(screen.getByText('Test show')).toBeInTheDocument();
        expect(screen.getByText('Overview text')).toBeInTheDocument();
        expect(screen.getByText('Action, Adventure')).toBeInTheDocument();
        expect(screen.getByText('8')).toBeInTheDocument();
      });
    });
  
    test('renders loading state initially for shows', () => {
      render(
        <BrowserRouter>
          <Details id={mockId} type={mockType} />
        </BrowserRouter>
      );
  
      expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    });
  
    
  });
  
  describe('Details Component Movie not found', () => {
    test('displays a not found message when no movie details are available', async () => {
      render(
        <BrowserRouter>
          <Details id="2786455454545" type="movie" />
        </BrowserRouter>
      );
  
      const notFoundMessage = await screen.findByText(/There is no movie with this ID/i);
      expect(notFoundMessage).toBeInTheDocument();
    });
  });
  
  
  describe('Details Component TV show not found', () => {
      test('displays a not found message when no TV show details are available', async () => {
        render(
          <BrowserRouter>
            <Details id="2786455454545" type="tv" />
          </BrowserRouter>
        );
    
        const notFoundMessage = await screen.findByText(/There is no TV Show with this ID/i);
        expect(notFoundMessage).toBeInTheDocument();
      });
    });