import "./FileCard.css";
import { getFileIcon } from "../../../utils/getFileIcon";
import { useFolder } from "../../../context/FolderContext";

const FileCard = ({ file, onMenuClick, selected, onSelect, onOpen }) => {
  const { selection, toggleSelection, openPreview } = useFolder();
  const isSelected = selected ?? selection.file.has(String(file.id));
  const handleSelect = onSelect || (() => toggleSelection("file", file.id));
  const handleOpen = onOpen || openPreview;
  return (
  <div className={`file-card ${isSelected ? "is-selected" : ""}`}>
    <input className="item-select" type="checkbox" checked={isSelected} onChange={handleSelect} aria-label={`Select ${file.name}`} />
    <div className="file-main" onClick={() => handleOpen(file)} role="button" tabIndex={0} onKeyDown={event => event.key === "Enter" && handleOpen(file)}>
      <div className="file-icon">{getFileIcon(file)}</div>
      <div className="file-info">
        <h3>{file.name}</h3>
        <p>{file.size} · {file.type || "File"} · {file.createdAt || "Sample file"}</p>
      </div>
    </div>
    <button
      className="file-menu-btn"
      aria-label={`Actions for ${file.name}`}
      onClick={event => onMenuClick?.(file.id, event.currentTarget)}
    >
      ⋮
    </button>
  </div>
  );
};

export default FileCard;
