import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import Breadcrumb from "../../components/explorer/BreadCrumb";
import ContextMenu from "../../components/explorer/ContextMenu";
import CreateFolderModal from "../../components/explorer/CreateFolderModel";
import RenameModal from "../../components/explorer/RenameModal";
import DeleteModal from "../../components/explorer/DeleteModal";
import PropertiesModal from "../../components/explorer/PropertiesModal";
import FolderHeader from "../../components/explorer/FolderHeader";
import { FileList, FolderList } from "../../components/explorer/ExplorerLists";
import "../../components/explorer/Breadcrumb.css";
import "../../components/explorer/Explorer.css";
import "./FolderDetails.css";
import { useFolder } from "../../context/FolderContext";
import { useContextMenu } from "../../hooks/useContextMenu";
import { useItemModal } from "../../hooks/useItemModal";
import { FILE_MENU_HEIGHT, FOLDER_MENU_HEIGHT, MENU_WIDTH } from "../../utils/constants";

const sameId = (first, second) => String(first) === String(second);

const FolderDetails = () => {
  const { folderId } = useParams();
  const fileInputRef = useRef(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const folderMenu = useContextMenu();
  const fileMenu = useContextMenu();
  const renameFolder = useItemModal();
  const deleteFolder = useItemModal();
  const renameFile = useItemModal();
  const deleteFile = useItemModal();
  const properties = useItemModal();
  const { folders, files, createFolder, renameFolder: saveFolder, deleteFolder: removeFolder, renameFile: saveFile, deleteFile: removeFile, downloadFile, uploadFile } = useFolder();

  const folder = folders.find(item => sameId(item.id, folderId));
  const childFolders = folders.filter(item => sameId(item.parentFolderId, folderId));
  const folderFiles = files.filter(item => sameId(item.folderId, folderId));
  const query = searchQuery.trim().toLowerCase();
  const visibleChildFolders = childFolders.filter(item => item.name.toLowerCase().includes(query));
  const visibleFolderFiles = folderFiles.filter(item => item.name.toLowerCase().includes(query));
  const openProperties = item => properties.openModal(item);

  if (!folder) {
    return <AppLayout><div className="folder-details"><h1>Folder not found</h1><p>This folder may have been deleted.</p><Link to="/files">Return to My Folders</Link></div></AppLayout>;
  }

  const folderMenuItems = [
    { label: "✏️ Rename", onClick: () => renameFolder.openModal(folders.find(item => sameId(item.id, folderMenu.selectedId))) },
    { label: "🗑️ Delete", onClick: () => deleteFolder.openModal(folders.find(item => sameId(item.id, folderMenu.selectedId))) },
    { label: "📋 Properties", onClick: () => openProperties(folders.find(item => sameId(item.id, folderMenu.selectedId))) },
  ];
  const fileMenuItems = [
    { label: "✏️ Rename", onClick: () => renameFile.openModal(files.find(item => sameId(item.id, fileMenu.selectedId))) },
    { label: "⬇️ Download", onClick: () => downloadFile(fileMenu.selectedId) },
    { label: "🗑️ Delete", onClick: () => deleteFile.openModal(files.find(item => sameId(item.id, fileMenu.selectedId))) },
    { label: "📋 Properties", onClick: () => openProperties(files.find(item => sameId(item.id, fileMenu.selectedId))) },
  ];

  return (
    <AppLayout>
      <div className="folder-details">
        <div><Breadcrumb currentFolderId={folderId} /><Link className="back-link" to={folder.parentFolderId !== null ? `/folders/${folder.parentFolderId}` : "/files"}>← Up</Link></div>
        <FolderHeader folder={folder} folderCount={childFolders.length} fileCount={folderFiles.length} searchQuery={searchQuery} onSearchChange={setSearchQuery} onCreateFolder={() => setIsCreateOpen(true)} onUpload={() => fileInputRef.current?.click()} />
        <input ref={fileInputRef} type="file" hidden onChange={event => { uploadFile(event.target.files[0], folderId); event.target.value = ""; }} />
        <div className="folder-content">
          <FolderList folders={visibleChildFolders} allFolders={folders} files={files} onMenuClick={(id, button) => folderMenu.openMenu(id, button, MENU_WIDTH, FOLDER_MENU_HEIGHT)} emptyTitle={query ? "No matching folders" : undefined} emptyDescription={query ? `No folder matches “${searchQuery}”.` : undefined} showEmpty={!visibleFolderFiles.length} />
          <FileList files={visibleFolderFiles} onMenuClick={(id, button) => fileMenu.openMenu(id, button, MENU_WIDTH, FILE_MENU_HEIGHT)} />
          {!childFolders.length && !folderFiles.length && <p>This folder is empty.</p>}
          {query && !visibleChildFolders.length && !visibleFolderFiles.length && <p className="search-empty">No items match “{searchQuery}”.</p>}
        </div>
      </div>

      <CreateFolderModal isOpen={isCreateOpen} folderName={folderName} setFolderName={setFolderName} onCreate={() => { createFolder(folderName, folderId); setFolderName(""); setIsCreateOpen(false); }} onCancel={() => { setFolderName(""); setIsCreateOpen(false); }} />
      <RenameModal isOpen={renameFolder.isOpen} folderName={renameFolder.value} setFolderName={renameFolder.setValue} onRename={() => { saveFolder(renameFolder.item.id, renameFolder.value.trim()); renameFolder.closeModal(); }} onCancel={renameFolder.closeModal} />
      <RenameModal isOpen={renameFile.isOpen} title="Rename File" label="File Name" folderName={renameFile.value} setFolderName={renameFile.setValue} onRename={() => { saveFile(renameFile.item.id, renameFile.value.trim()); renameFile.closeModal(); }} onCancel={renameFile.closeModal} />
      <DeleteModal isOpen={deleteFolder.isOpen} folderName={deleteFolder.item?.name} onDelete={() => { removeFolder(deleteFolder.item.id); deleteFolder.closeModal(); }} onCancel={deleteFolder.closeModal} />
      <DeleteModal isOpen={deleteFile.isOpen} title="Delete File" itemLabel="file" folderName={deleteFile.item?.name} onDelete={() => { removeFile(deleteFile.item.id); deleteFile.closeModal(); }} onCancel={deleteFile.closeModal} />
      <PropertiesModal isOpen={properties.isOpen} title={properties.item?.type ? "File Properties" : "Folder Properties"} onClose={properties.closeModal} item={properties.item} folderCount={folders.filter(item => sameId(item.parentFolderId, properties.item?.id)).length} fileCount={files.filter(item => sameId(item.folderId, properties.item?.id)).length} />
      <ContextMenu isOpen={folderMenu.selectedId !== null} {...folderMenu.position} onClose={folderMenu.closeMenu} items={folderMenuItems} />
      <ContextMenu isOpen={fileMenu.selectedId !== null} {...fileMenu.position} onClose={fileMenu.closeMenu} items={fileMenuItems} />
    </AppLayout>
  );
};

export default FolderDetails;
