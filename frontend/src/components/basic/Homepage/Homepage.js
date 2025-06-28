import React from "react";
import './homepage.css';
import './homepage.jpeg';
import { Navigate } from 'react-router-dom';
import { HomepageHeader } from "../header/header";
import Login from "../login/login";
import Auth from '../../../services/Auth';
import logoImg from './main.jpg';

function Homepage(){
  console.log("on home page");
  if(Auth.retriveToken() && Auth.retriveToken()!=='undefined'){
    return (<Navigate to='/home'/>);
  }
  else {
    return (
      <div className="homepage-container">
        <HomepageHeader title='Exam Portal' img={logoImg}/>
        <div className="parallax">
          <div className="homepage-content">
            <div className="homepage-hero">
              <h1 className="homepage-title">Welcome to Exam Portal</h1>
              <p className="homepage-subtitle">
                Streamline your examination process with our comprehensive online platform. 
                Manage students, teachers, and subjects with ease.
              </p>
            </div>
            
            <div className="homepage-features">
              <div className="feature-card">
                <span className="feature-icon">👨‍🏫</span>
                <h3 className="feature-title">Teacher Management</h3>
                <p className="feature-description">
                  Efficiently manage teacher accounts and assignments with our intuitive dashboard.
                </p>
              </div>
              
              <div className="feature-card">
                <span className="feature-icon">👨‍🎓</span>
                <h3 className="feature-title">Student Portal</h3>
                <p className="feature-description">
                  Provide students with easy access to exams and results through a user-friendly interface.
                </p>
              </div>
              
              <div className="feature-card">
                <span className="feature-icon">📚</span>
                <h3 className="feature-title">Subject Organization</h3>
                <p className="feature-description">
                  Organize and manage subjects, questions, and exam schedules seamlessly.
                </p>
              </div>
            </div>
            
            <div className="homepage-actions">
              <a href="#login" className="homepage-button primary">
                <span>🚀</span>
                Get Started
              </a>
              <a href="#features" className="homepage-button secondary">
                <span>📖</span>
                Learn More
              </a>
            </div>
          </div>
          
          <div id="login">
            <Login />
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
