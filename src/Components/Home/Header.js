import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../assets/css/style.css';

const Header = () => {
  const user = JSON.parse(localStorage.getItem("userData"));

  const onLogoutHandler = () => {
    localStorage.clear();
    window.location.href = '/sign-in';
  };

  return (
    <div>
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between">
          <a href="index.html" className="logo d-flex align-items-center">
            <img src="assets/img/logo.png" alt="" />
            <span className="d-none d-lg-block">NiceAdmin</span>
          </a>
          <i className="bi bi-list toggle-sidebar-btn"></i>
        </div>

        <div className="search-bar">
          <form className="search-form d-flex align-items-center" method="POST" action="#">
            <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
            <button type="submit" title="Search"><i className="bi bi-search"></i></button>
          </form>
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <h3>{user ? user.first_name : "Guest"} {user ? user.last_name : "Guest"}</h3>{" "}
            <li className="nav-item dropdown">
              <Button className="btn btn-sm" onClick={onLogoutHandler}>
                Sign Out
              </Button>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
