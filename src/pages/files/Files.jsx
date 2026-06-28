import { useState } from "react";

import AppLayout from "../../layouts/AppLayout";
import Button from "../../components/common/Button/Button";
import FolderCard from "./FolderCard/FolderCard";

import CreateFolderModal from "../../components/explorer/CreateFolderModel";
import RenameFolderModal from "../../components/explorer/RenameFolderModal";
import ContextMenu from "../../components/explorer/ContextMenu";

import { useFolder } from "../../context/FolderContext";

import "./Files.css";
import DeleteFolderModal from "../../components/explorer/DeleteFolderModal";

const Files = () => {

  const [showFolderForm, setShowFolderForm] = useState(false);
  const [folderName, setFolderName] = useState("");

  const [selectedFolderId, setSelectedFolderId] = useState(null);

  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameFolderName, setRenameFolderName] = useState("");
  const [renameFolderId, setRenameFolderId] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteFolderId, setDeleteFolderId] = useState(null);
  const [deleteFolderName, setDeleteFolderName] = useState("");

  const [menuPosition, setMenuPosition] = useState({
    x: 0,
    y: 0,
  });

  const {
    folders,
    createFolder,
    renameFolder,
    deleteFolder,
  } = useFolder();

  return (
    <AppLayout>

      <div className="files-page">

        <div className="files-header">

          <h1>My Folders</h1>

          <Button
            onClick={() =>
              setShowFolderForm(!showFolderForm)
            }
          >
            {showFolderForm
              ? "Cancel"
              : "New Folder"}
          </Button>

        </div>

        <CreateFolderModal
          isOpen={showFolderForm}
          folderName={folderName}
          setFolderName={setFolderName}
          onCreate={() => {

            createFolder(folderName);

            setFolderName("");
            setShowFolderForm(false);

          }}
          onCancel={() => {

            setFolderName("");
            setShowFolderForm(false);

          }}
        />

        <RenameFolderModal
          isOpen={showRenameModal}
          folderName={renameFolderName}
          setFolderName={setRenameFolderName}
          onRename={() => {

            renameFolder(
              renameFolderId,
              renameFolderName.trim()
            );

            setRenameFolderId(null);
            setRenameFolderName("");

            setShowRenameModal(false);
            setSelectedFolderId(null);

          }}
          onCancel={() => {

            setRenameFolderId(null);
            setRenameFolderName("");

            setShowRenameModal(false);
            setSelectedFolderId(null);

          }}
        />

        <DeleteFolderModal
          isOpen={showDeleteModal}
          folderName={deleteFolderName}
          onDelete={() => {

            deleteFolder(deleteFolderId);

            setDeleteFolderId(null);
            setDeleteFolderName("");

            setShowDeleteModal(false);
            setSelectedFolderId(null);

          }}
          onCancel={() => {

            setDeleteFolderId(null);
            setDeleteFolderName("");

            setShowDeleteModal(false);
            setSelectedFolderId(null);

          }}
        />

        <div className="folders-list">

          {folders
            .filter(
              folder =>
                folder.parentFolderId === null
            )
            .map(folder => (

              <FolderCard
                key={folder.id}
                folderId={folder.id}
                folderName={folder.name}
                fileCount={0}
                onMenuClick={(id, button) => {

                  const rect =
                    button.getBoundingClientRect();

                  const menuWidth = 180;
                  const menuHeight = 140;

                  let x = rect.right + 4;
                  let y = rect.bottom + 4;

                  if (
                    x + menuWidth >
                    window.innerWidth
                  ) {
                    x = rect.left - menuWidth - 4;
                  }

                  if (
                    y + menuHeight >
                    window.innerHeight
                  ) {
                    y = rect.top - menuHeight - 4;
                  }

                  setSelectedFolderId(id);

                  setMenuPosition({
                    x,
                    y,
                  });

                }}
              />

            ))}

        </div>

        <ContextMenu
          isOpen={selectedFolderId !== null}
          x={menuPosition.x}
          y={menuPosition.y}
          onClose={() =>
            setSelectedFolderId(null)
          }
          items={[
            {
              label: "Rename",
              onClick: () => {

                const folder =
                  folders.find(
                    folder =>
                      folder.id ===
                      selectedFolderId
                  );

                if (!folder) return;

                setRenameFolderId(folder.id);
                setRenameFolderName(folder.name);

                setShowRenameModal(true);

              },
            },
            {
              label: "Delete",
              onClick: () => {

                const folder = folders.find(
                  folder => folder.id === selectedFolderId
                );

                if (!folder) return;

                setDeleteFolderId(folder.id);
                setDeleteFolderName(folder.name);

                setShowDeleteModal(true);

              },
            },
            {
              label: "Properties",
              onClick: () => {
                console.log(
                  "Properties:",
                  selectedFolderId
                );
              },
            },
          ]}
        />

      </div>

    </AppLayout>
  );
};

export default Files;