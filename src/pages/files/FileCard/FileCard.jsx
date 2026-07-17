import "./FileCard.css";
import { getFileIcon } from "../../../utils/getFileIcon";

const FileCard = ({ file, onMenuClick }) => (
  <div className="file-card">
    <div className="file-main">
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

export default FileCard;
