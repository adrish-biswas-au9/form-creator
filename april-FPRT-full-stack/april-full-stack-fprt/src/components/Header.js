import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";

import { HashLink } from 'react-router-hash-link';
import { NavHashLink } from 'react-router-hash-link';
import Logout from './Logout';


class Header extends Component {

  render() {
    
    return (
      <nav className="navbar sticky-top navbar-expand navbar-dark main" style={{ backgroundColor: "#111" }}>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">

              <HashLink className="nav-link" id="home-link" to="/home#top">Home<span className="sr-only">(current)</span></HashLink>
            </li>

            <li className="nav-item nav-item active" >
              <HashLink className="nav-link" id="home-link"
                to="/forms#top"
              >Forms
                <span className="sr-only">(current)</span>
              </HashLink>
            </li>

            <li className="nav-item nav-item active" >
              <HashLink className="nav-link" id="home-link"
                to="/profilePage#top"
              >User Profile Page
                <span className="sr-only">(current)</span>
              </HashLink>
            </li>

            <li className="nav-item nav-item active" >
              <HashLink className="nav-link" id="home-link"
                to="/responses#top"
              >Responses
                <span className="sr-only">(current)</span>
              </HashLink>
            </li>
          </ul>


          <HashLink to='/profilePage#top'><img style={{height:'40px', width: '40px', borderRadius:'20px'}} alt='profilePhoto' src={sessionStorage.getItem('profilePhoto')} /></HashLink>

          <div style={{ padding: '5px' }}><Logout /></div>

          

        </div>
      </nav>
    )
    
  }
  
  
}

export default Header;