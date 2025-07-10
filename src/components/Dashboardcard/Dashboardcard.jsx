import React from 'react';
import './DashboardCard.css';

const DashboardCard = ({ title, percent, color, Icon }) => {
  return (
    <div className="dashboard-card-horizontal" style={{ borderLeft: `7px solid ${color}` }}>
      <div className="dashboard-card-content">
        {/* Top Title */}
        <div className="dashboard-card-header">
          <span className="dashboard-title" style={{ color }}>{title.toUpperCase()}</span>
        </div>

        {/* Bottom Row: Percentage + Progress + Icon pushed to right */}
        <div className="dashboard-progress-row">
          <h3 className="dashboard-percent">{percent}%</h3>
          <div className="progress-bar-wrapper">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${percent}%`, backgroundColor: color }}
              ></div>
            </div>
          </div>
          {Icon && <div className="progress-icon"><Icon size={45} color="#9ca3af" /></div>}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
