import React from "react";
import "../css/MovieTVShowFeed.css";
import MediaFeed from "./MediaFeed";

const MovieComponent = () => {
  return (
    <>
      <MediaFeed
        type="movie"
        placeholder="Search movies..."
        title="TOP 10 Movies of all time"
      />
    </>
  );
};

export default MovieComponent;
