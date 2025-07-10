import React from 'react';
import DashboardCard from '../../components/Dashboardcard/Dashboardcard';
import { ClipboardList } from 'lucide-react';
import MyBarChart from '../../components/MyBarChart.jsx';
import './Dashboard.css';

const Dashboard = () => {
  const data = [
    { title: 'Python', percent: 55, color: '#3b82f6', Icon: ClipboardList },
    { title: 'Alteryx', percent: 75, color: '#10b981', Icon: ClipboardList },
    { title: 'Informatica Mapping', percent: 50, color: '#06b6d4', Icon: ClipboardList },
    { title: 'Informatica Workflow', percent: 80, color: '#fbbf24', Icon: ClipboardList },
    { title: 'Informatica Workflow', percent: 80, color: '#fbbf24', Icon: ClipboardList },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
       
      </div>

      <div className="progress-grid">
        {data.map((item, idx) => (
          <DashboardCard
            key={idx}
            title={item.title}
            percent={item.percent}
            color={item.color}
            Icon={item.Icon}
          />
        ))}
      </div>

      
      <div className="chart-wrapper">
        <h4>Chart Overview</h4>
        <MyBarChart />
      </div>
    </div>
  );
};

export default Dashboard;
