import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Loader from "react-loader-spinner";

const MovieList = (props) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  let similarMoviesURL;

  if (props.movieID) {
    similarMoviesURL = `https://api.themoviedb.org/3/movie/${props.movieID}/similar?api_key=450bf04edaaa49ba73752463a5e7270d&language=pt-BR&page=1`;
  }
  const trendingMoviesURL =
    "https://api.themoviedb.org/3/trending/movie/week?api_key=450bf04edaaa49ba73752463a5e7270d&language=pt-BR";

  const fetchMovies = async () => {
    if (props.movieID) {
      const response = await fetch(similarMoviesURL);
      const data = await response.json();
      setMovies(data.results);
    } else {
      const response = await fetch(trendingMoviesURL);
      const data = await response.json();
      setMovies(data.results);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
    window.scrollTo(0, 0);
  }, [props.movieID]);

  const imgBaseURL = "https://image.tmdb.org/t/p/original/";

  if (loading) {
    return (
      <div className="loader">
        <Loader type="Puff" color="#057af7d6" height={100} width={100} />
      </div>
    );
  }

  return (
    <div className="listItem">
      <div className="movie-list-container">
        <ul className="movie-list">
          <h1>{props.title}</h1>
          {movies.map((item) => (
            <Link to={`/movies/${item.id}`}>
              <li className="movie-item">
                <img src={`${imgBaseURL}${item.poster_path}`} alt="" />
                <span>{item.title}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieList;
