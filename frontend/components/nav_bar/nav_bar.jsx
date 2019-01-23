import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const display = this.props.currentUser ? (
      <div className="greeting">
        <p>Hello, {this.props.currentUser.first_name} </p>
        <button onClick={this.props.logout}>Log out</button>
      </div>
    ) : (
      <div className="greeting">
        <Link className="btn login" to="/login">Log in</Link>
        <Link className="btn signup" to="/signup">Sign Up</Link>
      </div>
    )

    return(
      <div className="nav-bar">
        <div className="write-review">
          <a href="#">Write a review</a>
        </div>
        {display}
      </div>
    )
  }
}

export default NavBar;