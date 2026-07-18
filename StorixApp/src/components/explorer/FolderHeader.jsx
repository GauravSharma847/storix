import Button from "../common/Button/Button";

const FolderHeader = ({ folder, folderCount, fileCount, onCreateFolder, onUpload, searchQuery, onSearchChange }) => (
  <div className="folder-header">
    <div>
      <h1>📁 {folder.name}</h1>
      <p>{folderCount} folder{folderCount === 1 ? "" : "s"} · {fileCount} file{fileCount === 1 ? "" : "s"}</p>
    </div>
    <div className="folder-actions">
      <label className="explorer-search">
        <span aria-hidden="true">🔎</span>
        <input value={searchQuery} onChange={event => onSearchChange(event.target.value)} placeholder="Search this folder" aria-label="Search this folder" />
      </label>
      <Button onClick={onCreateFolder}>New Folder</Button>
      <Button onClick={onUpload}>Upload File</Button>
    </div>
  </div>
);

export default FolderHeader;
