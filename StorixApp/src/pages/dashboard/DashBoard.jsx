import AppLayout from '../../layouts/AppLayout';
import Card from '../../components/common/Card/Card';
import { useFolder } from '../../context/FolderContext';
import { formatBytes, getFileSizeInBytes } from '../../utils/formatBytes';
import { STORAGE_LIMIT_BYTES } from '../../utils/constants';
import "./Dashboard.css"

const Dashboard = () => {
  const { files } = useFolder();

  const storageUsedInBytes = files.reduce((total, file) => total + getFileSizeInBytes(file.size), 0);
  const storagePercent = Math.min((storageUsedInBytes / STORAGE_LIMIT_BYTES) * 100, 100);

  const stats = [
    {
      title: "Total Files",
      value: files.length,
    },
    {
      title: "Storage Used",
      value: formatBytes(storageUsedInBytes),
    },
    {
      title: "Images",
      value: files.filter(file => file.type === "image" || file.type?.startsWith("image/")).length,
    },
    {
      title: "Documents",
      value: files.filter(file =>
        file.type === "pdf" ||
        file.type === "document" ||
        file.type?.includes("document") ||
        file.type?.includes("pdf")
      ).length,
    },
  ];
  const recentFiles = files.slice(-4).reverse();
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
          <div className="storage-heading">
            <h2>Storage</h2>
            <span>{formatBytes(storageUsedInBytes)} / {formatBytes(STORAGE_LIMIT_BYTES)}</span>
          </div>
          <div className="storage-bar" aria-label={`${storagePercent.toFixed(1)}% storage used`}>
            <div className="storage-bar-used" style={{ width: `${storagePercent}%` }} />
          </div>
        </Card>
        <Card>
          <h2>Recent Uploads</h2>

          <div className="recent-files">
            {recentFiles.map((file) => (
              <div
                key={file.id}
                className="recent-file"
              >
                {file.name}
              </div>
            ))}
          </div>
        </Card>

      </div>
    </AppLayout>
  );
};

export default Dashboard;
