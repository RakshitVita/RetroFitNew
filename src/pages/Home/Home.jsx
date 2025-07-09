import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import './Home.css';

const Home = () => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      console.log('Files dropped:', files);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      console.log('Files selected:', files);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-wrapper">
        {/* Header */}
        <div className="upload-header">
          <h1 className="upload-title">
            From Roadblock to Roadmap — Documentation<br />
            That Gets You Back on Track.
          </h1>
        </div>

        {/* Upload Area */}
        <div className="upload-card">
          <div
            className={`upload-area ${isDragOver ? 'drag-over' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {/* Upload Icon */}
            <div className="upload-icon-wrapper">
              <div className="upload-icon">
                <Upload size={32} color="#ffffff" />
              </div>
            </div>

            {/* Main Text */}
            <p className="upload-main-text">
              Select a file or drag and drop here
            </p>

            {/* Subtext */}
            <p className="upload-subtext">
              Only supported to python, java
            </p>

            {/* Select Button */}
            <label className="upload-button">
              <input
                type="file"
                className="upload-input"
                accept=".py,.java"
                onChange={handleFileSelect}
              />
              Select a File
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;