import React, { useState } from "react";
import "../css/Navbar.css";
import { NavLink, useMatch } from "react-router-dom";

function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const route=useMatch('/tv/:id')

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <i className="fas fa-film" style={{ color: "white" }} />
          <p id="nav-title">Rubicon</p>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {
              <li className="nav-item">
                <NavLink
                  to="/movie"
                  className="nav-links"
                  onClick={closeMobileMenu}
                  style={({ isActive }) =>
                    isActive
                      ? { color: "white", boxShadow: "inset 0 0 10px #000000" }
                      : { color: "black", fontWeight:'bold' }
                  }
                >
                  Movies
                </NavLink>
              </li>
            }
            <li className="nav-item">
              <NavLink
                to="/"
                className="nav-links"
                onClick={closeMobileMenu}
                style={({ isActive }) =>
                  isActive || route
                    ? { color: "white", boxShadow: "inset 0 0 10px #000000" }
                    : { color: "black" , fontWeight:'bold' }
                }
              >
                TV Shows
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
