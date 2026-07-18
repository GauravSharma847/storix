import Button from "../common/Button/Button";
import { getFileIcon } from "../../utils/getFileIcon";
import { formatDate } from "../../utils/formatDate";
import "./PropertiesModal.css";

const DetailRow = ({ label, value }) => (
  <div className="property-row"><span>{label}</span><strong title={String(value)}>{value}</strong></div>
);

const PropertiesModal = ({ isOpen, title, onClose, item, folderCount = 0, fileCount = 0 }) => {
  if (!isOpen || !item) return null;

  const isFile = Boolean(item.type);
  const icon = isFile ? getFileIcon(item) : "📁";

  return (
    <div className="modal-overlay" role="presentation" onMouseDown={onClose}>
      <section className="properties-modal" role="dialog" aria-modal="true" aria-labelledby="properties-title" onMouseDown={event => event.stopPropagation()}>
        <header className="properties-header">
          <div className="properties-icon">{icon}</div>
          <div><p>{isFile ? "FILE DETAILS" : "FOLDER DETAILS"}</p><h2 id="properties-title">{title}</h2></div>
          <button className="properties-close" onClick={onClose} aria-label="Close properties">×</button>
        </header>
        <div className="property-name"><span>{icon}</span><strong>{item.name}</strong></div>
        <div className="properties-list">
          <DetailRow label="Kind" value={isFile ? "File" : "Folder"} />
          {isFile ? <><DetailRow label="Type" value={item.type || "Unknown"} /><DetailRow label="Size" value={item.size || "Unknown"} /></> : <><DetailRow label="Subfolders" value={folderCount} /><DetailRow label="Files" value={fileCount} /></>}
          <DetailRow label="Created" value={formatDate(item.createdAt)} />
          <DetailRow label="ID" value={item.id} />
        </div>
        <footer><Button variant="secondary" onClick={onClose}>Close</Button></footer>
      </section>
    </div>
  );
};

export default PropertiesModal;
