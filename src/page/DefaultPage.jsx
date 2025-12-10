import React from "react";
import "./DefaultPage.css";
import clubdata from "../resources.json";

const DefaultPage = () => {
  const clubs = clubdata.clubs;
  return (
    <div className="hero">
      <div className="vs-box">
        <div className="team">
          <img src="" alt="" />
        </div>
        <div className="choose-score-box">
          <div className="score">
            <button>+</button>
            <button>-</button>
          </div>
          Vs
          <div className="score">
            <button>+</button>
            <button>-</button>
          </div>
        </div>
        <div className="team">
          <img src="" alt="" />
        </div>
      </div>

      <div className="search-box">
        <form action="submit">
          <input type="text" placeholder="Enter your club or nation" />
        </form>
        <button className="img"><img src="./search.png" alt="" /></button>
      </div>
      
      <div className="competitor">
        <ul className="grid-list">
          {clubs.map((club) => (
            <li key={club.name}>
              <img src={club.url} alt="" />
              <p>{club.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DefaultPage;
