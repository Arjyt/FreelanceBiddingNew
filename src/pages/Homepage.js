import React from 'react';
import '../styles/homepage.css'; // Import CSS for styling

const HomePage = () => {
  const data = localStorage.getItem("loggedInUser"); // Simple string
  const response = data; // No need for JSON.parse

  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <section className="hero1">
        <div className="hero-content1">
          <h1>Connect with Top Freelancers or Get Hired for Exciting Projects!</h1>
          <p>Your platform to find the perfect match between clients and freelancers.</p>
          <div className="hero-buttons">
            <a href={response ? "/dashboard" : "/signup"} className="btn primary-btn">
              find jobs
            </a>
            <a href={response ? "/client-dashbord" : "/signup"} className="btn secondary-btn">Hire a freelancer</a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="features-list">
          <div className="feature-item">
            <h3>Job Posting</h3>
            <p>Clients can post jobs, and freelancers can bid for the work. Perfect match, every time!</p>
          </div>
          <div className="feature-item">
            <h3>Bidding System</h3>
            <p>Freelancers compete by placing bids on projects, ensuring competitive pricing for clients.</p>
          </div>
          <div className="feature-item">
            <h3>Milestone Tracking</h3>
            <p>Break down your project into milestones and pay only when you’re satisfied with each one.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 Freelance Bidding Platform. All rights reserved.</p>
        <p>
          <a href="/terms">Terms of Service</a> | <a href="/privacy">Privacy Policy</a>
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
