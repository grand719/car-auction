import React from "react";

import NavLinks from "./NavLinks";

const MainHeader = () => {
  return (
    <header style={{ backgroundColor: "#292929" }}>
      <nav>
        <NavLinks />
      </nav>
    </header>
  );
};

export default MainHeader;
