import { useNavigate } from "react-router-dom";
import "./FolderCard.css";

const FolderCard = ({ folder, fileCount, folderCount, onMenuClick }) => {
  const navigate = useNavigate();

  return (
    <div className="folder-card">
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
