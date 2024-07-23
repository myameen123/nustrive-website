import React from "react";
import "./loader.css";
import AnimatedLogo from "./animatedLogo";

const Loader = ({ children }) => {
  return (
    <div className="loader-backdrop">
      <div className="loader-spinner">
        <AnimatedLogo />
        {children}
      </div>
    </div>
  );
};

export default Loader;
