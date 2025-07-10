import React, { useState } from 'react';
//import { Upload } from 'lucide-react';
import './Home.css';
import { FaCloudUploadAlt } from "react-icons/fa";
import ConfirmBox from '../../components/ConfirmBox/ConfirmBox';


const Home = () => {
  //demo state for confirm dialog
   const [open, setOpen] = useState(false);

  const fileList = ["file1.py", "file2.sql", "module.js"];

  const handleConfirm = () => {
    console.log("Confirmed");
    setOpen(false);
  };

  const handleCancel = () => {
    console.log("Cancelled");
    setOpen(false);};

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

  const languages = ['Python', 'Java', 'JavaScript', 'C++', 'Ruby']; // Example languages

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
                <FaCloudUploadAlt size={64} color="adb5bd" />
              </div>
            </div>

            {/* Main Text */}
            <p className="upload-main-text">
              Select a file or drag and drop here
            </p>
            <div className="dropdown-section">
              <label htmlFor="fileType">Choose your Code</label>
              <select
                id="fileType"
                // value={fileType}
                // onChange={handleFiletypeChange}
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            {/* Subtext */}
            <p className="upload-subtext">
              Only supported to python, java
            </p>
                  <button onClick={() => setOpen(true)}>Open Confirm Dialog</button>

      <ConfirmBox
        open={open}
        subtitle="All files will be processed using the 12 points you’ve submitted."
        fileList={fileList}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

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