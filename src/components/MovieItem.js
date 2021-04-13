import React, { useState, useEffect } from "react";
import MovieList from "./MovieList";
import { ProvidersList } from "./ProvidersList";

import Loader from "react-loader-spinner";
import { searchSingleMovie } from "../services/search";

const imgBaseURL = "https://image.tmdb.org/t/p/original/";

const MovieItem = ({ match }) => {
  const movieID = match.params.id;

  const [movie, setMovie] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    searchSingleMovie(movieID).then((response) => {
      setMovie(response.data);
      setGenres(response.data.genres);
      setLoading(false);
    });
  }, [movieID]);

  if (loading) {
    return (
      <div className="loader">
        <Loader type="Puff" color="#057af7d6" height={100} width={100} />
      </div>
    );
  }

  return (
    <div className="MovieItem">
      {movie.length !== "undefined" && (
        <div>
          <div className="MovieItemDetails">
            <div>
              <img
                className="moviePoster"
                src={`${imgBaseURL}${movie.poster_path}`}
                alt=""
              />
            </div>
            <div className="MovieItemDetailsText">
              <div className="movieItemDetailTop">
                <h1>{movie.title}</h1>
                <div className="rating">
                  <img alt="" src={window.location.origin + "/star.png"}></img>
                  <span>{movie.vote_average}</span>
                </div>
              </div>
              <ul>
                {genres.map((item) => (
                  <li key={item.name}>{item.name}</li>
                ))}
              </ul>
              <p>{movie.overview}</p>
              <h3>Streaming</h3>
              <ProvidersList movieID={movieID} />
            </div>
          </div>
          <MovieList movieID={movieID} title={"Filmes Semelhantes"} />
        </div>
      )}
    </div>
  );
};

export default MovieItem;
