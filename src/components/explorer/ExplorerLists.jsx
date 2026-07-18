import FileCard from "../../pages/files/FileCard/FileCard";
import FolderCard from "../../pages/files/FolderCard/FolderCard";
import EmptyState from "./EmptyState";

const sameId = (first, second) => String(first) === String(second);

export const FolderList = ({ folders, allFolders = folders, files, onMenuClick, emptyAction, emptyTitle, emptyDescription, showEmpty = true, selectedIds, onSelect }) => {
  if (!folders.length) {
    return showEmpty ? <EmptyState title={emptyTitle || "No folders here"} description={emptyDescription || "Create a folder to keep your files organised."} action={emptyAction} /> : null;
  }

  return folders.map(folder => (
    <FolderCard
      key={folder.id}
      folder={folder}
      fileCount={files.filter(file => sameId(file.folderId, folder.id)).length}
      folderCount={allFolders.filter(child => sameId(child.parentFolderId, folder.id)).length}
      onMenuClick={onMenuClick}
      selected={selectedIds?.has(String(folder.id))}
      onSelect={onSelect}
    />
  ));
};

export const FileList = ({ files, onMenuClick, selectedIds, onSelect, onOpen }) => (
  files.map(file => <FileCard key={file.id} file={file} onMenuClick={onMenuClick} selected={selectedIds?.has(String(file.id))} onSelect={onSelect} onOpen={onOpen} />)
);
