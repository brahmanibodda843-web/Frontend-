import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function Home() {
  return (
    <div className="home-container">
      <div className="hero-card">
        <div className="hero-content">
          <div className="hero-icon">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 14L9 21H15L12 14Z" fill="currentColor"/>
              <circle cx="12" cy="6" r="4" fill="currentColor"/>
              <path d="M20 12C20 13.1046 19.1046 14 18 14C16.8954 14 16 13.1046 16 12C16 10.8954 16.8954 10 18 10C19.1046 10 20 10.8954 20 12Z" fill="currentColor"/>
              <path d="M8 12C8 13.1046 7.10457 14 6 14C4.89543 14 4 13.1046 4 12C4 10.8954 4.89543 10 6 10C7.10457 10 8 10.8954 8 12Z" fill="currentColor"/>
            </svg>
          </div>
          <h1 className="hero-title">Student Management System</h1>
          <p className="hero-description">
            Streamlined academic administration for modern education
          </p>
          <div className="hero-features">
            <div className="feature-item">
              <span className="feature-icon">📚</span>
              <span>Course Management</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">👥</span>
              <span>Student Records</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📅</span>
              <span>Timetable Scheduling</span>
            </div>
          </div>
        </div>
        <div className="hero-action">
          <Link to="/login">
            <button className="hero-btn">
              <span>Get Started</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </Link>
          <p className="login-hint">Secure login for administrators and students</p>
        </div>
      </div>
    </div>
  );
}

export default Home;