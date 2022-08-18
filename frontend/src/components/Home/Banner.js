import React, { useState } from "react";
import logo from "../../imgs/logo.png";

const Banner = (props) => {
  const [showSearch, setShowSearch] = useState(0);

  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" />
        <div>
          <span id="get-part" onClick={() => setShowSearch(1)}>
            A place to get{" "}
          </span>
          {showSearch ? (
            <span className="search-box-container">
              <input
                id="search-box"
                placeholder="What is it that you truly desire?"
                value={props.term}
                onChange={(e) => props.onChange(e.target.value)}
              />
              <img src="search_icon.svg" />
            </span>
          ) : null}
          <span> the cool stuff.</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
