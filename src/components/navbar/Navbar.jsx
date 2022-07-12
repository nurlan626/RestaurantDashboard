import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="header-logo">Algoritma</div>
      <div className="navbar">
        <div>
          <NavLink to="/" className="Link">
            Esas sehife
          </NavLink>
        </div>
        <div>
          <NavLink to="/allorders" className="Link">
            Butun sifarishler
          </NavLink>
        </div>
        <div>
          <NavLink to="/neworders" className="Link">
            Sifarish yarat
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
