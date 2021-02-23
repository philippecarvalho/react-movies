import React, { useState, useEffect } from "react";
import MovieList from "./MovieList";

import Loader from "react-loader-spinner";

const imgBaseURL = "https://image.tmdb.org/t/p/original/";

const MovieItem = ({ match }) => {
  const movieID = match.params.id;

  const [movie, setMovie] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovie();
  }, [movieID]);

  const fetchMovie = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}?api_key=450bf04edaaa49ba73752463a5e7270d&language=pt-BR`
    );
    const data = await response.json();
    setMovie(data);
    setGenres(data.genres);
    setLoading(false);
  };

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

const ProvidersList = (props) => {
  const movieID = props.movieID;
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    fetchProvider();
  }, [movieID]);

  const fetchProvider = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}/watch/providers?api_key=450bf04edaaa49ba73752463a5e7270d`
    );
    const data = await response.json();
    setProviders(data.results);
  };

  if (providers.BR) {
    if (providers.BR.flatrate) {
      return (
        <div className="providerList">
          {providers.BR.flatrate.map((item) => (
            <div>
              <img
                src={`${imgBaseURL}${item.logo_path}`}
                alt={`${item.provider_name}`}
                title={`${item.provider_name}`}
              />
            </div>
          ))}
        </div>
      );
    }
  }

  return <span>Nenhum streaming disponível</span>;
};

export default MovieItem;
