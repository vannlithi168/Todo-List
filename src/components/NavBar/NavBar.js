import React from "react";
import "./NavBar.css";
import { LuBookOpenCheck } from "react-icons/lu";

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
      <input type="text" placeholder="search.." />
    </nav>
  );
}

export default Navbar;
