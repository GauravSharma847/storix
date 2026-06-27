import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import AppLayout from "../../layouts/AppLayout";
import Button from "../../components/common/Button/Button";
import CreateFolderModal from "../../components/explorer/CreateFolderModel";
import FileCard from "../files/FileCard/FileCard";
import FolderCard from "../files/FolderCard/FolderCard";

import { useFolder } from "../../context/FolderContext";
import Breadcrumb from "../../components/explorer/Breadcrumb";

import "../../components/explorer/Breadcrumb.css";

import "./FolderDetails.css";

const FolderDetails = () => {

    const { folderId } = useParams();

    const [showFolderForm, setShowFolderForm] = useState(false);
    const [folderName, setFolderName] = useState("");

    const {
        folders,
        files,
        createFolder,
        uploadFile,
    } = useFolder();

    const folder = folders.find(
        folder => folder.id === Number(folderId)
    );

    const childFolders = folders.filter(
        folder => folder.parentFolderId === Number(folderId)
    );

    const folderFiles = files.filter(
        file => file.folderId === Number(folderId)
    );

    return (
        <AppLayout>

            <div className="folder-details">

                <div>

                    <Breadcrumb
                        currentFolderId={folderId}
                    />

                    <Link
                        to={
                            folder?.parentFolderId
                                ? `/folders/${folder.parentFolderId}`
                                : "/files"
                        }
                    >
                        ← Up
                    </Link>

                </div>

                <div className="folder-header">

                    <div>

                        <h1>
                            📁 {folder?.name || "Folder Not Found"}
                        </h1>

                        <p>
                            {childFolders.length} Folder(s) • {folderFiles.length} File(s)
                        </p>

                    </div>

                    <div className="folder-actions">

                        <Button
                            onClick={() =>
                                setShowFolderForm(true)
                            }
                        >
                            New Folder
                        </Button>

                        <input
                            type="file"
                            id="file-upload"
                            style={{ display: "none" }}
                            onChange={(e) =>
                                uploadFile(
                                    e.target.files[0],
                                    Number(folderId)
                                )
                            }
                        />

                        <Button
                            onClick={() =>
                                document
                                    .getElementById("file-upload")
                                    .click()
                            }
                        >
                            Upload File
                        </Button>

                    </div>

                </div>

                <CreateFolderModal
                    isOpen={showFolderForm}
                    folderName={folderName}
                    setFolderName={setFolderName}
                    onCreate={() => {
                        createFolder(
                            folderName,
                            Number(folderId)
                        );

                        setFolderName("");
                        setShowFolderForm(false);
                    }}
                    onCancel={() => {
                        setShowFolderForm(false);
                        setFolderName("");
                    }}
                />

                <div className="folder-content">

                    {childFolders.map(child => (

                        <FolderCard
                            key={child.id}
                            folderId={child.id}
                            folderName={child.name}
                            fileCount={0}
                        />

                    ))}

                    {folderFiles.length === 0 ? (

                        childFolders.length === 0 &&
                        <p>This folder is empty.</p>

                    ) : (

                        folderFiles.map(file => (

                            <FileCard
                                key={file.id}
                                fileName={file.name}
                                fileSize={file.size}
                            />

                        ))

                    )}

                </div>

            </div>

        </AppLayout>
    );
};

export default FolderDetails;