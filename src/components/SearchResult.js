import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ match }) => {
  const [movies, setMovies] = useState([]);
  const searchValue = match.params.query;
  const searchMoviesURL = `https://api.themoviedb.org/3/search/movie?api_key=450bf04edaaa49ba73752463a5e7270d&language=pt-BR&query=${searchValue}&page=1&include_adult=false`;

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(searchMoviesURL);
      const data = await response.json();
      setMovies(data.results);
    };

    fetchMovies();
  }, [match.params.query, searchValue, searchMoviesURL]);

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
