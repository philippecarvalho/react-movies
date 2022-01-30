import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { searchTrendingMovies, searchSimilarMovies } from "../utils/search";
import { imgBaseURL } from "../utils/imgBaseURL";

import Loader from "react-loader-spinner";

const MovieList = (props) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.getElementById("search-form").reset();

    if (props.movieID) {
      searchSimilarMovies(props.movieID).then((response) => {
        setMovies(response.data.results);
        setLoading(false);
      });
    } else {
      searchTrendingMovies().then((response) => {
        setMovies(response.data.results);
        setLoading(false);
      });
    }

    window.scrollTo(0, 0);
  }, [props.movieID]);

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
        <h1>{props.title}</h1>
        <ul className="movie-list">
          {movies.map((item) => (
            <Link key={item.id} to={`/movies/${item.id}`}>
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
