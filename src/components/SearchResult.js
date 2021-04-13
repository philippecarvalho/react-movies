import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { searchMultipleMovies } from "../services/search";

const SearchResult = ({ match }) => {
  const [movies, setMovies] = useState([]);
  const searchValue = match.params.query;

  useEffect(() => {
    searchMultipleMovies(searchValue).then((response) =>
      setMovies(response.data.results)
    );
  }, [searchValue]);

  const imgBaseURL = "https://image.tmdb.org/t/p/original/";

  return (
    <div className="listItem">
      <div className="movie-list-container">
        <ul className="movie-list">
          <h1>Resultados para: {match.params.query}</h1>
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

export default SearchResult;
