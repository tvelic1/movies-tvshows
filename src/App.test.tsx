import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Details from './components/Details';

jest.mock('./fetchData/api', () => ({
  fetchFindById: jest.fn().mockResolvedValue(null), 
  fetchSearchVideo: jest.fn().mockResolvedValue([])
}));

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
  

