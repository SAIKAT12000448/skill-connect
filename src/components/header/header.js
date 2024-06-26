import React, { useState } from "react";
import "./header.css";
import ProfileDropdown from "../profilebackdrop/profilebackdrop";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";

const Header = (props) => {
  const [showDropdown, setshowDropdown] = useState(false);
  const email = localStorage.getItem('email');
  return (
    <header className="header">
      {/* <Link to="/" className="homePage">
        <img src={Tweeter} className="tweeter" />
        <img src={TweeterMobile} className="tweeterMobile" />
      </Link> */}
      <h1 style={{color:'#2f80ed'}}>Skill Connect</h1>
      <nav className="navBar">
        <NavLink className="navLink" to="/">
          Home
        </NavLink>
        {/* <NavLink className="navLink" to="/explore">
          Explore
        </NavLink>
        <NavLink className="navLink" to="/bookmarks">
          Bookmarks
        </NavLink> */}
        <NavLink className="navLink" to="/recomend">
          Recomendation
        </NavLink>
        <NavLink className="navLink" to={`/chat?name=${email}`}>
          Chat
        </NavLink>
      </nav>
      <div className="userProfile">
        <a
          className="userSummary"
          onClick={() => setshowDropdown(!showDropdown)}
        >
          <img src={props.imageURL} className="userImage" />
          <a className="username">{props.username}</a>
        </a>
        {showDropdown ? <ProfileDropdown /> : null}
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    imageURL: state.imageURL,
    username: state.username,
    error: state.error,
  };
};

export default connect(mapStateToProps, null)(Header);
