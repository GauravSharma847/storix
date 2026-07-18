import { useNavigate } from "react-router-dom";
import "./FolderCard.css";
import { useFolder } from "../../../context/FolderContext";

const FolderCard = ({ folder, fileCount, folderCount, onMenuClick, selected, onSelect }) => {
  const navigate = useNavigate();
  const { selection, toggleSelection } = useFolder();
  const isSelected = selected ?? selection.folder.has(String(folder.id));
  const handleSelect = onSelect || (() => toggleSelection("folder", folder.id));

  return (
    <div className={`folder-card ${isSelected ? "is-selected" : ""}`}>
      <input className="item-select" type="checkbox" checked={isSelected} onChange={handleSelect} aria-label={`Select ${folder.name}`} />
      <div className="folder-main" onClick={() => navigate(`/folders/${folder.id}`)}>
        <div className="folder-icon">📁</div>
        <div className="folder-info">
          <h3>{folder.name}</h3>
          <p>{folderCount} folder{folderCount === 1 ? "" : "s"} · {fileCount} file{fileCount === 1 ? "" : "s"}</p>
        </div>
      </div>
      <button
        className="folder-menu-btn"
        aria-label={`Actions for ${folder.name}`}
        onClick={event => onMenuClick?.(folder.id, event.currentTarget)}
      >
        ⋮
      </button>
    </div>
  );
};

export default FolderCard;
