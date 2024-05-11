import React from "react";
import "../css/MovieTVShowFeed.css";
import MediaFeed from "./MediaFeed";

const TVShows = () => {
  return (
    <>
      <MediaFeed
        type="tv"
        placeholder="Search TV shows..."
        title="TOP 10 rated TV SHOWS of all time"
      />
    </>
  );
};

export default TVShows;
