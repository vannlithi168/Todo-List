import React from "react";
import "./SearchBar.css";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={(event) => setSearchQuery(event.target.value)}
    />
  );
};

export default SearchBar;
