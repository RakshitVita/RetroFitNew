import React from "react";
import "./Introduction.css";

const Introduction = () => {
  return (
    <div className="welcome-wrapper">
      <div className="welcome-section">
        <h2 className="heading">Welcome to Retrofit</h2>
        <p className="description">
          Retrofit is a powerful tool designed to convert code into comprehensive documentation.
          It ensures that if an employee is on leave, their work can seamlessly carry forward using this tool.
          With Retrofit, you can easily document your code, making it accessible and understandable for your team.
        </p>
      </div>
    </div>
  );
};

export default Introduction;
