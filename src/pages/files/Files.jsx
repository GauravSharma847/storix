import React, { useState } from 'react'
import AppLayout from '../../layouts/AppLayout';
import Button from '../../components/common/Button/Button';
import FolderCard from './FolderCard/FolderCard';
import Input from '../../components/common/Input/Input';
import "./Files.css"
const Files = () => {
  const [showFolderForm, setShowFolderForm] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [folders, setFolders] = useState([
    {
      id: 1,
      name: "Personal",
      fileCount: 5,
    },
    // {
    //   id: 2,
    //   name: "Work",
    //   fileCount: 12,
    // },
    // {
    //   id: 3,
    //   name: "College",
    //   fileCount: 8,
    // },
  ]);

  // const handleFileUpload = (event) => {
  //   const selectedFile = event.target.files[0];
  //   if (!selectedFile) return;

  //   const newFile = {
  //     name: selectedFile.name,
  //     size: `${(selectedFile.size / 1024).toFixed(2)}KB`
  //   };

  //   setFiles((prevFiles) => [
  //     ...prevFiles,
  //     newFile,
  //   ]);
  // };

  const createFolder = () => {
    if (!folderName.trim()) return;

    const newFolder = {
      id: Date.now(),
      name: folderName,
      fileCount: 0,
    };

    setFolders((prevFolders) => [
      ...prevFolders,
      newFolder,
    ]);

    setFolderName("");
    setShowFolderForm(false);
  };

  return (
    <AppLayout>
      <div className='files-page'>
        <div className='files-header'>
          <h1>My Folders</h1>

          <Button
            onClick={() =>
              setShowFolderForm(!showFolderForm)
            }
          >
            {showFolderForm ? "Cancel" : "New Folder"}
          </Button>
        </div>
        {
          showFolderForm && (
            <div className="folder-form">

              <Input
                label="Folder Name"
                placeholder="Enter folder name"
                value={folderName}
                onChange={(e) =>
                  setFolderName(e.target.value)
                }
              />

              <Button onClick={createFolder} className="crete-btn">
                Create Folder
              </Button>

            </div>
          )
        }

        <div className='folders-list'>
          {folders.map((folder) => (
            <FolderCard
              key={folder.id}
              folderId={folder.id}
              folderName={folder.name}
              fileCount={folder.fileCount}
            />
          ))}
        </div>
      </div>
    </AppLayout>
  )
}

export default Files;