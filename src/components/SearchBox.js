import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SearchBox = (props) => {
  const history = useHistory();
  // const onChange = (e) => this.setState({ search: e.target.value });
  const [searchValue, setSearchValue] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${searchValue}`);
  };

  return (
    <div className="searchBox">
      <form onSubmit={onSubmit}>
        <input
          onChange={(event) => setSearchValue(event.target.value)}
          type="text"
          placeholder="Procure por um filme"
        />
        {/* <button type="submit">Pesquisar</button> */}
      </form>
    </div>
  );
};

export default SearchBox;
