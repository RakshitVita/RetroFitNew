import React from "react";
import "./InfoTooltip.css"; // Import your CSS for styling

const InfoTooltip = ({ fileName, details }) => (
  <div>
    <div className="Heading">
      {fileName}
    </div>
    <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
      {details.map((obj, idx) => {
        const [file, msg] = Object.entries(obj)[0];
        return (
          <li key={idx} style={{ marginBottom: 6 }}>
            <strong>{file}</strong>: {msg}
          </li>
        );
      })}
    </ul>
  </div>
);

export default InfoTooltip;
