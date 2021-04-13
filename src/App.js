import React from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieItem from "./components/MovieItem";
import SearchBox from "./components/SearchBox";
import SearchResult from "./components/SearchResult";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  document.title = "React Movies";
  return (
    <Router>
      <div className="App">
        <header>
          <Link to="/">
            <div className="logoContainer">
              <img
                alt="react movie logo"
                src={window.location.origin + "/logo-react-movies.png"}
              />
              <h1>React Movies</h1>
            </div>
          </Link>

          <div className="searchAndLinks">
            <SearchBox />
            <span>
              <Link to="/about">Sobre</Link>
            </span>
          </div>
        </header>
      </div>

      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <MovieList title={"Principais essa semana "} />}
        />
        <Route path="/movies/:id" component={MovieItem} />
        <Route path="/search/:query" component={SearchResult} />
        <Route
          path="/about"
          component={() => {
            window.location.href =
              "https://github.com/philippecarvalho/react-movies";
            return null;
          }}
        />
      </Switch>
    </Router>
  );
}

export default App;
