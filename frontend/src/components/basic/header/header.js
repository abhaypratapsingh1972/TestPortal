import React from 'react';
import './header.css';

export const HomepageHeader = (props) => {
  return (
    <header className="header-container">
      <div className="header-content">
        <div className="header-brand">
          <img src={props.img} alt="Logo" className="header-logo"/>
          <h1 className="header-title">{props.title}</h1>
        </div>
        
        <nav className="header-navigation">
          <ul>
            <li className="nav-item">
              <a href="#" className="nav-link active">Dashboard</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Students</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Teachers</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Subjects</a>
            </li>
          </ul>
        </nav>
        
        <div className="header-actions">
          <button className="header-button secondary">
            <span>👤</span>
            Profile
          </button>
          <button className="header-button">
            <span>🚪</span>
            Logout
          </button>
        </div>
        
        <button className="mobile-menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}