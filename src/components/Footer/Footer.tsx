import React from "react";

type FooterType = {
  children: React.ReactChild | React.ReactChild[];
};

const Footer = ({ children }: FooterType) => {
  return <footer style={{ backgroundColor: "#292929" }}>{children}</footer>;
};

export default Footer;
