import React from "react";
import "./App.css";

export default function ReadingStarApp() {
  const Button = ({ children, className = '', ...props }) => (
    <button className={`button ${className}`} {...props}>
      {children}
    </button>
  );

  const Input = ({ className = '', ...props }) => (
    <input className={`input ${className}`} {...props} />
  );

  const Card = ({ children, className = '', ...props }) => (
    <div className={`card ${className}`} {...props}>
      {children}
    </div>
  );

  const CardContent = ({ children, className = '' }) => (
    <div className={`card-content ${className}`}>{children}</div>
  );

  const Switch = ({ checked }) => (
    <input type="checkbox" checked={checked} readOnly className="switch" />
  );

  return (
    <div className="app-container">
      {/* Sidebar - Classic Nursery Rhymes */}
      <div className="sidebar">
        <h2 className="section-title">Classic Nursery Rhymes</h2>
        <div className="sidebar-list">
          {[
            "Humpty Dumpty",
            "The Hokey Cokey",
            "Looby Loo",
            "Twinkle, Twinkle...",
            "Apples and Bananas",
            "Hush Little Baby",
          ].map((item, index) => (
            <div
              key={index}
              className={`sidebar-item ${
                item === "Twinkle, Twinkle..." ? "active" : ""
              }`}
            >
              <span>{item}</span>
              <Button className="delete-button">🗑️</Button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="score-box">Score: 128</div>
        <div className="url-input">
          <Input placeholder="Enter YouTube URL" />
          <Button>Go</Button>
        </div>
        <Card className="video-card">
          <CardContent>
            <img src="/star_placeholder.png" alt="Video" className="video-image" />
          </CardContent>
        </Card>
        <p className="caption">🎵 Twinkle twinkle little star 🎵</p>
      </div>

      {/* Right Panel - Playlists & AI Difficulty */}
      <div className="right-panel">
        <div>
          <h2 className="section-title">Playlists</h2>
          <Button className="create-playlist">Create playlist: ➕</Button>
          <div className="playlist-list">
            <div className="playlist green">Classic Nursery Rhymes</div>
            <div className="playlist blue">Helen Allison School</div>
            <div className="playlist blue">Disney Songs</div>
          </div>
        </div>
        <div>
          <h2 className="section-title">AI Difficulty</h2>
          <div className="difficulty-buttons">
            <Button className="difficulty easy">Easy</Button>
            <Button className="difficulty medium">Medium</Button>
            <Button className="difficulty hard">Hard</Button>
          </div>
        </div>
      </div>

      {/* Header Controls */}
      <div className="header">
        <span>readingstar</span>
        <div className="header-controls">
          <span>Scoring on?</span>
          <Switch checked />
          <Button>ℹ️</Button>
          <Button>⚙️</Button>
          <Button>Focus Mode</Button>
        </div>
      </div>
    </div>
  );
}
