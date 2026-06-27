import { useState } from "react";

import AppLayout from "../../layouts/AppLayout";
import Button from "../../components/common/Button/Button";
import FolderCard from "./FolderCard/FolderCard";
import CreateFolderModal from "../../components/explorer/CreateFolderModel";
import { useFolder } from "../../context/FolderContext";

import "./Files.css";

const Files = () => {
  const [showFolderForm, setShowFolderForm] = useState(false);
  const [folderName, setFolderName] = useState("");

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
              />
            ))}

        </div>

      </div>
    </AppLayout>
  );
};

export default Files;