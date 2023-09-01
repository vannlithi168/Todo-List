import React from "react";
import "./NavBar.css";
import { LuBookOpenCheck } from "react-icons/lu";
import SearchBar from "../SearchBar/SearchBar";

function Navbar({ searchQuery, setSearchQuery }) {
  return (
    <nav className="navbar">
      <h1>
        {" "}
        <span>
          <LuBookOpenCheck />
        </span>
        TodoList
      </h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />{" "}
    </nav>
  );
}

export default Navbar;
