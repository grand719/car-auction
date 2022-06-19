import React from "react";

import "./LoadingSpiner.css";

const LoadingSpinner = ({ asOverlay }: {asOverlay: boolean}) => {
  return (
    <div className={`${!!asOverlay && "loading-spinner__overlay"}`}>
      <div className="lds-dual-ring" />
    </div>
  );
};

export default LoadingSpinner; 