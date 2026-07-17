import { useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import Button from "../../components/common/Button/Button";
import CreateFolderModal from "../../components/explorer/CreateFolderModel";
import RenameModal from "../../components/explorer/RenameModal";
import DeleteModal from "../../components/explorer/DeleteModal";
import PropertiesModal from "../../components/explorer/PropertiesModal";
import ContextMenu from "../../components/explorer/ContextMenu";
import { FolderList } from "../../components/explorer/ExplorerLists";
import "../../components/explorer/Explorer.css";
import "./Files.css";
import { useFolder } from "../../context/FolderContext";
import { useContextMenu } from "../../hooks/useContextMenu";
import { useItemModal } from "../../hooks/useItemModal";
import { FOLDER_MENU_HEIGHT, MENU_WIDTH } from "../../utils/constants";

const sameId = (first, second) => String(first) === String(second);

const Files = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const menu = useContextMenu();
  const rename = useItemModal();
  const remove = useItemModal();
  const properties = useItemModal();
  const { folders, files, createFolder, renameFolder, deleteFolder } = useFolder();
  const rootFolders = folders.filter(folder => folder.parentFolderId === null);
  const visibleFolders = rootFolders.filter(folder => folder.name.toLowerCase().includes(searchQuery.trim().toLowerCase()));
  const totalChildFolders = folders.filter(folder => folder.parentFolderId !== null).length;

  const selectedFolder = folders.find(folder => sameId(folder.id, menu.selectedId));
  const menuItems = [
    { label: "✏️ Rename", onClick: () => rename.openModal(selectedFolder) },
    { label: "🗑️ Delete", onClick: () => remove.openModal(selectedFolder) },
    { label: "📋 Properties", onClick: () => properties.openModal(selectedFolder) },
  ];

  return (
    <AppLayout>
      <div className="files-page">
        <header className="files-hero">
          <div>
            <p className="eyebrow">YOUR STORAGE</p>
            <h1>📂 My Folders</h1>
            <p>Keep your work, personal files, and uploads organised in one place.</p>
          </div>
          <Button onClick={() => setIsCreateOpen(true)}>＋ New Folder</Button>
        </header>

        <section className="files-summary" aria-label="Folder summary">
          <div><span>📁</span><strong>{rootFolders.length}</strong><small>Top-level folders</small></div>
          <div><span>🗂️</span><strong>{totalChildFolders}</strong><small>Nested folders</small></div>
          <div><span>📄</span><strong>{files.length}</strong><small>Total files</small></div>
        </section>

        <section className="files-section">
          <div className="section-title"><h2>Folders</h2><span>{rootFolders.length} items</span></div>
          <label className="files-search">
            <span aria-hidden="true">🔎</span>
            <input value={searchQuery} onChange={event => setSearchQuery(event.target.value)} placeholder="Search folders" aria-label="Search folders" />
            {searchQuery && <button type="button" onClick={() => setSearchQuery("")} aria-label="Clear search">×</button>}
          </label>
          <div className="folders-list">
            <FolderList
              folders={visibleFolders}
              allFolders={folders}
              files={files}
              onMenuClick={(id, button) => menu.openMenu(id, button, MENU_WIDTH, FOLDER_MENU_HEIGHT)}
              emptyAction={<Button onClick={() => setIsCreateOpen(true)}>Create your first folder</Button>}
              emptyTitle={searchQuery ? "No matching folders" : undefined}
              emptyDescription={searchQuery ? `No folder matches “${searchQuery}”.` : undefined}
            />
          </div>
        </section>
      </div>

      <CreateFolderModal isOpen={isCreateOpen} folderName={folderName} setFolderName={setFolderName} onCreate={() => { createFolder(folderName); setFolderName(""); setIsCreateOpen(false); }} onCancel={() => { setFolderName(""); setIsCreateOpen(false); }} />
      <RenameModal isOpen={rename.isOpen} folderName={rename.value} setFolderName={rename.setValue} onRename={() => { renameFolder(rename.item.id, rename.value.trim()); rename.closeModal(); }} onCancel={rename.closeModal} />
      <DeleteModal isOpen={remove.isOpen} folderName={remove.item?.name} onDelete={() => { deleteFolder(remove.item.id); remove.closeModal(); }} onCancel={remove.closeModal} />
      <PropertiesModal isOpen={properties.isOpen} title="Folder Properties" onClose={properties.closeModal} item={properties.item} folderCount={folders.filter(folder => sameId(folder.parentFolderId, properties.item?.id)).length} fileCount={files.filter(file => sameId(file.folderId, properties.item?.id)).length} />
      <ContextMenu isOpen={menu.selectedId !== null} {...menu.position} onClose={menu.closeMenu} items={menuItems} />
    </AppLayout>
  );
};

export default Files;
