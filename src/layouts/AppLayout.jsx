import { NavLink } from "react-router-dom";
import { useFolder } from "../context/FolderContext";
import { formatBytes, getFileSizeInBytes } from "../utils/formatBytes";
import { STORAGE_LIMIT_BYTES } from "../utils/constants";
import "./AppLayout.css";
import storixLogo from "../assets/storix-icon.png";
import Button from "../components/common/Button/Button";
import FilePreviewModal from "../components/explorer/FilePreviewModal";
const AppLayout = ({ children }) => {
  const { files, selection, toggleFavorite, deleteFolder, deleteFile, clearSelection, previewFile, closePreview } = useFolder();
  const storageUsed = files.reduce((total, file) => total + getFileSizeInBytes(file.size), 0);
  const storagePercent = Math.min((storageUsed / STORAGE_LIMIT_BYTES) * 100, 100);

  return (
    <div className="layout">
      <aside className="sidebar">
        <NavLink className="brand" to="/dashboard">
          {/* <span className="brand-mark">S</span> */}
          <img
            src={storixLogo}
            alt="Storix Logo"
            className="brand-logo"
          />
          <span><strong>Storix</strong><small>Personal storage</small></span>
        </NavLink>

        <div className="sidebar-section-label">WORKSPACE</div>
        <nav className="sidebar-nav" aria-label="Main navigation">
          <NavLink to="/dashboard" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
            <span aria-hidden="true">⌂</span> Dashboard
          </NavLink>
          <NavLink to="/files" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
            <span aria-hidden="true">📁</span> My Files
          </NavLink>
          <NavLink to="/favorites" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
            <span aria-hidden="true">F</span> Favorites
          </NavLink>
          <NavLink to="/trash" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
            <span aria-hidden="true">T</span> Trash
          </NavLink>
        </nav>

        <div className="sidebar-storage">
          <div className="sidebar-storage-title"><span>Storage</span><span>{storagePercent.toFixed(0)}%</span></div>
          <div className="sidebar-storage-bar"><div style={{ width: `${storagePercent}%` }} /></div>
          <small>{formatBytes(storageUsed)} of {formatBytes(STORAGE_LIMIT_BYTES)}</small>
        </div>

        <div className="sidebar-footer"><span className="account-avatar">G</span><span><strong>My account</strong><small>Free plan</small></span></div>
      </aside>
      <main className="content">{(selection.folder.size + selection.file.size) > 0 && <div className="bulk-actions"><strong>{selection.folder.size + selection.file.size} selected</strong><Button variant="secondary" onClick={() => { selection.folder.forEach(id => toggleFavorite("folder", id)); selection.file.forEach(id => toggleFavorite("file", id)); clearSelection(); }}>Favorite</Button><Button variant="danger" onClick={() => { selection.folder.forEach(id => deleteFolder(id)); selection.file.forEach(id => deleteFile(id)); clearSelection(); }}>Delete</Button><Button variant="secondary" onClick={clearSelection}>Clear</Button></div>}{children}</main>
      <FilePreviewModal file={previewFile} onClose={closePreview} />
    </div>
  );
};

export default AppLayout;
