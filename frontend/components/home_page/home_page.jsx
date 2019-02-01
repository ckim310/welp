import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../nav_bar/nav_bar';
import HomeTop from './home_top';
import BrowseCategory from './browse_category';


const HomePage = (props) => {

  return (
    <div className="home-main-container overlay" >
      <div className="home-main-top-container">
        <NavBar />

        <HomeTop />
      </div>
    </div>
  )
}

export default HomePage;