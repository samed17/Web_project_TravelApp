import React from "react";
import { Link } from 'react-router-dom';

function Landingscreen() {
  return (
    <div className="row landing">
      <div className="col-md-12 text-center">
        <h2 style={{ color: 'white', fontSize: '130px' }}>Travel App</h2>
        <h1 style={{ color: 'white' }}>There is only one boss. The Guest.</h1>
        <Link to='/home'>
          <button className="btn landingbtn" style={{ color: 'black' }}>Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default Landingscreen;
