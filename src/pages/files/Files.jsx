import { useState } from "react";

import AppLayout from "../../layouts/AppLayout";
import Button from "../../components/common/Button/Button";
import FolderCard from "./FolderCard/FolderCard";
import CreateFolderModal from "../../components/explorer/CreateFolderModel";
import { useFolder } from "../../context/FolderContext";

import "./Files.css";
import ContextMenu from "../../components/explorer/ContextMenu";

const Files = () => {
  const [showFolderForm, setShowFolderForm] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const { folders, createFolder } = useFolder();

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
            {showFolderForm ? "Cancel" : "New Folder"}
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
            setShowFolderForm(false);
            setFolderName("");
          }}
        />

        <div className="folders-list">

          {folders
            .filter(folder => folder.parentFolderId === null)
            .map(folder => (
              <FolderCard
                key={folder.id}
                folderId={folder.id}
                folderName={folder.name}
                fileCount={0}
                onMenuClick={(id, button) => {

                  const rect = button.getBoundingClientRect();

                  const menuWidth = 180;
                  const menuHeight = 140;

                  let x = rect.right;
                  let y = rect.bottom;

                  // If menu would go outside the right edge,
                  // show it on the left.
                  if (x + menuWidth > window.innerWidth) {
                    x = rect.left - menuWidth;
                  }

                  // If menu would go outside the bottom,
                  // show it above the button.
                  if (y + menuHeight > window.innerHeight) {
                    y = rect.top - menuHeight;
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
          onClose={() => setSelectedFolderId(null)}
          items={[
            {
              label: "Rename",
              onClick: () => {
                console.log("Rename Folder:", selectedFolderId);
              },
            },
            {
              label: "Delete",
              onClick: () => {
                console.log("Delete Folder:", selectedFolderId);
              },
            },
            {
              label: "Properties",
              onClick: () => {
                console.log("Properties:", selectedFolderId);
              },
            },
          ]}
        />

      </div>
    </AppLayout>
  );
};

export default Files;