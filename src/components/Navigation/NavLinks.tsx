import React from "react";
import { NavLink } from "react-router-dom";

const NavLinks = () => {
  return (
    <ul
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        listStyle: "none",
        backgroundColor: "#292929",
        height: 60,
      }}
    >
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/createPost">Add car post</NavLink>
      </li>
      <li>
        <NavLink to="/userDetails">User</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
