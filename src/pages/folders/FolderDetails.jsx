import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import AppLayout from "../../layouts/AppLayout";
import Button from "../../components/common/Button/Button";
import CreateFolderModal from "../../components/explorer/CreateFolderModel";
// import FileCard from "../files/FileCard/FileCard";
import FileCard from "../files/FileCard/FileCard";
import FolderCard from "../files/FolderCard/FolderCard";

import ContextMenu from "../../components/explorer/ContextMenu";
import RenameFolderModal from "../../components/explorer/RenameFolderModal";
import DeleteFolderModal from "../../components/explorer/DeleteFolderModal";

import { useFolder } from "../../context/FolderContext";
import Breadcrumb from "../../components/explorer/Breadcrumb";

import "../../components/explorer/Breadcrumb.css";

import "./FolderDetails.css";

const FolderDetails = () => {

    const { folderId } = useParams();

    const [showFolderForm, setShowFolderForm] = useState(false);
    const [folderName, setFolderName] = useState("");

    const [selectedFolderId, setSelectedFolderId] = useState(null);

    const [showRenameModal, setShowRenameModal] = useState(false);
    const [renameFolderId, setRenameFolderId] = useState(null);
    const [renameFolderName, setRenameFolderName] = useState("");

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteFolderId, setDeleteFolderId] = useState(null);
    const [deleteFolderName, setDeleteFolderName] = useState("");

    const [menuPosition, setMenuPosition] = useState({
        x: 0,
        y: 0,
    });

    const {
        folders,
        files,
        createFolder,
        renameFolder,
        deleteFolder,
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

                <div className="folder-content">

                    {childFolders.map(child => (

                        <FolderCard
                            key={child.id}
                            folderId={child.id}
                            folderName={child.name}
                            fileCount={0}
                            onMenuClick={(id, button) => {

                                const rect = button.getBoundingClientRect();

                                const menuWidth = 180;
                                const menuHeight = 140;

                                let x = rect.right + 4;
                                let y = rect.bottom + 4;

                                if (x + menuWidth > window.innerWidth) {
                                    x = rect.left - menuWidth - 4;
                                }

                                if (y + menuHeight > window.innerHeight) {
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
                    <ContextMenu
                        isOpen={selectedFolderId !== null}
                        x={menuPosition.x}
                        y={menuPosition.y}
                        onClose={() => setSelectedFolderId(null)}
                        items={[
                            {
                                label: "Rename",
                                onClick: () => {

                                    const folder = folders.find(
                                        folder => folder.id === selectedFolderId
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

                                    console.log(folder);

                                },
                            },
                        ]}
                    />
                </div>

            </div>

        </AppLayout>
    );
};

export default FolderDetails;