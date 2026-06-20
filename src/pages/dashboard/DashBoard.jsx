import React from 'react'
import AppLayout from '../../layouts/AppLayout';
import Card from '../../components/common/Card/Card';
import "./Dashboard.css"

const Dashboard = () => {
  const stats = [
    {
      title: "Total Files",
      value: 42,
    },
    {
      title: "Storage Used",
      value: "1.2 GB",
    },
    {
      title: "Images",
      value: 12,
    },
    {
      title: "Documents",
      value: 18,
    },
  ];
  const recentFiles = [
    "resume.pdf",
    "photo.jpg",
    "project.zip",
    "notes.docx",
  ];
  return (
    <AppLayout>
      <div className="dashboard">

        <div className="dashboard-header">
          <h1>Welcome Back</h1>
          <p>Here's an overview of your storage.</p>
        </div>

        <div className="stats-grid">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <div className="stat-card">
                <h3>{stat.title}</h3>
                <p>{stat.value}</p>
              </div>
            </Card>

          ))}
        </div>
        <Card>
          <h2>Recent Uploads</h2>

          <div className="recent-files">
            {recentFiles.map((file) => (
              <div
                key={file}
                className="recent-file"
              >
                {file}
              </div>
            ))}
          </div>
        </Card>

      </div>
    </AppLayout>
  );
};

export default Dashboard;
