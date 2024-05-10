import React, { useEffect, useState } from "react";
import "../css/MediaDetails.css";
import { fetchFindById, fetchSearchVideo } from "../fetchData/api";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import VideoPlayer from "./VideoPlayer";
import { IVideoResponse } from "../interfaces/VideoInterface";
import { IMediaDetails } from "../interfaces/MediaInterface";
import { FaStar } from "react-icons/fa";

function Details({ id, type }: { id: string; type: "tv" | "movie" }) {
  const [selectedMedia, setSelectedMedia] = useState<IMediaDetails | null>(
    null
  );

  const [key, setKey] = useState<string>("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const fixDate = (date: string) => {
    const parts = date.split("-");
    const reversedParts = parts.reverse();
    return reversedParts.join(".");
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const mediaById = await fetchFindById(type, id);
        if (mediaById) {

          setSelectedMedia(mediaById);
        }

        const data = await fetchSearchVideo(type, id);

        if (data) {

          data.forEach((item: IVideoResponse) => {
            if (item.type === "Trailer" && item.key) {
              setKey(item.key);
            }
          });
        }

         else {
          setKey("");
        }

      } catch (error) {
        console.error("Failed to fetch video key or findById:", error);
      } 

      finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, type]);

  if (isLoading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div className="movie-details">
      <button
        className="back-button"
        onClick={() => navigate(type === "movie" ? "/movie" : "/")}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>

      {!selectedMedia ? (
        <h2>
          There is no {type === "movie" ? "movie" : "TV show"} with this ID
        </h2>
      ) : (
        <>
          <h1 style={{ textAlign: "center" }}>
            {selectedMedia.title || selectedMedia.name}
          </h1>
          <div className="movie-info">
            <div className="movie-media">
              {key ? (
                <VideoPlayer videoKey={key || ""}></VideoPlayer>
              ) : (
                <img
                  src={`https://image.tmdb.org/t/p/w500${selectedMedia.poster_path}`}
                  alt={selectedMedia.title || selectedMedia.name}
                />
              )}
              <div className="movie-stats">
                <p>
                  <strong>Vote Count:</strong> {selectedMedia.vote_count}
                </p>
                <p>
                  <strong>Popularity:</strong> {selectedMedia.popularity}
                </p>
                <p>
                  <strong>Release Date:</strong>{" "}
                  {fixDate(
                    selectedMedia.release_date || selectedMedia.first_air_date
                  )}
                </p>

                <p>
                  <strong>Status:</strong> {selectedMedia.status}
                </p>
              </div>
            </div>
            <p>
              <strong>Overview:</strong> {selectedMedia.overview}
            </p>
            <div className="genres-rating-container">
              <p className="genres">
                <strong>Genres:</strong>{" "}
                {selectedMedia?.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p className="rating">
                <strong>Rating: </strong>
                {selectedMedia.vote_average} <FaStar color="#007bff" />
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Details;
