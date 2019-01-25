import React from 'react';
import { Link } from 'react-router-dom';
import NavBarRight from './nav_bar_right';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return(
      <div className="nav-bar">
        <div className="nav-bar-links">
          <a href="#" className="nav-bar-link" id="write-review">Write a review</a>
          <a href="https://github.com/ckim310" className="nav-bar-link" id="github">Github <i className="fab fa-github"></i></a>
          <a href="https://www.linkedin.com/in/christine-kim-46857544/" className="nav-bar-link" id="linkedin">LinkedIn <i className="fab fa-linkedin"></i></a>
        </div>

        <NavBarRight logout={this.props.logout} currentUser={this.props.currentUser}/>
        
      </div>
    )
  }
}

export default NavBar;