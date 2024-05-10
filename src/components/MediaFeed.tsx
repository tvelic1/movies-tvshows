import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/MovieTVShowFeed.css";
import useStore from "../globalVariables/SearchStore";
import { fetchMoviesOrTvshows, fetchSearch } from "../fetchData/api";
import { SequenceOfMoviesOrTVShows } from "../fetchData/api";
const MediaFeed = ({
  type,
  placeholder,
  title,
}: {
  type: "movie" | "tv";
  placeholder: string;
  title: string;
}) => {
  const navigate = useNavigate();
  const [media, setMedia] = useState<SequenceOfMoviesOrTVShows>(null);
  const { moviesOrShowsFromSearch, setFromSearch, search, setSearch } = useStore();

  const prevSearchRef = useRef(search);

  useEffect(() => {
    const fetchData = async () => {

      if (search.length < 3) {

        const storedData = localStorage.getItem(`topTen-${type}`);

        if (storedData) {
          setMedia(JSON.parse(storedData));
          setFromSearch(false);
          return;
        }
        try {
          const data = await fetchMoviesOrTvshows(type);
          setMedia(data);
          localStorage.setItem(`topTen-${type}`, JSON.stringify(data));
          setFromSearch(false);
        } catch (error) {
          console.error(`Failed to fetch ${type}:`, error);
        }
      } else {
        try {
          const searchData = await fetchSearch(search, type);
          setMedia(searchData);
          setFromSearch(true);
        } catch (error) {
          console.error(`Failed to fetch search results for ${type}:`, error);
        }
      }
    };
      //we need to load data 1 second after last letter was typed, but page is loaded instantly on tab switching if there was no changes in input
    if (prevSearchRef.current === search) {
      fetchData();
    } else {
      const timeoutId = setTimeout(fetchData, 1000);
      return () => clearTimeout(timeoutId);
    }
    prevSearchRef.current = search;
  }, [search, setFromSearch, type]);

  return (
    <>
      <input
        id="inputSearch"
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {!moviesOrShowsFromSearch && <h3 id="title">{title}</h3>}
      <div className="movie-feed">
        {media &&
          media.results
            .filter((item) => item.poster_path)
            .sort((a, b) => b.vote_average - a.vote_average)
            .slice(0, moviesOrShowsFromSearch ? undefined : 10)
            .map((item, index) => (
              <div
                key={index}
                className={`movie-card ${
                  item.vote_average > 8 ? "recommended" : ""
                }`}
                onClick={() => navigate(`/${type}/${item.id}`)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt=""
                />
                <h2 style={{ textAlign: "center" }}>
                  {item.title || item.name}
                </h2>
              </div>
            ))}
      </div>
    </>
  );
};

export default MediaFeed;
