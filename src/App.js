import React from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieItem from "./components/MovieItem";
import SearchBox from "./components/SearchBox";
import SearchResult from "./components/SearchResult";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <Link to="/">
            <div class="logoContainer">
              <img
                alt="react movie logo"
                src={window.location.origin + "/logo-react-movies.png"}
              />
              <h1>React Movies</h1>
            </div>
          </Link>

          {/* <span>
            <Link to="/about">About</Link>
          </span>

          <input type="text" name="" id="" /> */}
          <SearchBox />
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
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  );
}

function About() {
  return (
    <div>
      <h1>Philippe Carvalho</h1>
    </div>
  );
}

export default App;
