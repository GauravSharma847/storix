import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import AppLayout from "../../layouts/AppLayout";
import Button from "../../components/common/Button/Button";
import CreateFolderModal from "../../components/explorer/CreateFolderModel";
// import FileCard from "../files/FileCard/FileCard";
import FileCard from "../files/FileCard/FileCard";
import FolderCard from "../files/FolderCard/FolderCard";

import ContextMenu from "../../components/explorer/ContextMenu";
import RenameFolderModal from "../../components/explorer/RenameModal";
import DeleteFolderModal from "../../components/explorer/DeleteModal";

import { useFolder } from "../../context/FolderContext";
import Breadcrumb from "../../components/explorer/Breadcrumb";

import "../../components/explorer/Breadcrumb.css";

import "./FolderDetails.css";
import PropertiesModal from "../../components/explorer/PropertiesModal";

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

    const [showRenameFileModal, setShowRenameFileModal] = useState(false);
    const [renameFileId, setRenameFileId] = useState(null);
    const [renameFileName, setRenameFileName] = useState("");

    const [showDeleteFileModal, setShowDeleteFileModal] = useState(false);
    const [deleteFileId, setDeleteFileId] = useState(null);
    const [deleteFileName, setDeleteFileName] = useState("");

    const [menuPosition, setMenuPosition] = useState({
        x: 0,
        y: 0,
    });

    const [selectedFileId, setSelectedFileId] = useState(null);

    const [fileMenuPosition, setFileMenuPosition] = useState({
        x: 0,
        y: 0,
    });

    const [showPropertiesModal, setShowPropertiesModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [propertiesTitle, setPropertiesTitle] = useState("");

    const {
        folders,
        files,
        createFolder,
        renameFolder,
        deleteFolder,
        renameFile,
        deleteFile,
        downloadFile,
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
                        console.log("renameFileId:", renameFileId);
                        console.log("renameFileName:", renameFileName);
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

                <RenameFolderModal
                    isOpen={showRenameFileModal}
                    folderName={renameFileName}
                    setFolderName={setRenameFileName}
                    onRename={() => {

                        renameFile(
                            renameFileId,
                            renameFileName.trim()
                        );

                        setRenameFileId(null);
                        setRenameFileName("");

                        setShowRenameFileModal(false);
                        setSelectedFileId(null);

                    }}
                    onCancel={() => {

                        setRenameFileId(null);
                        setRenameFileName("");

                        setShowRenameFileModal(false);
                        setSelectedFileId(null);

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

                <DeleteFolderModal
                    isOpen={showDeleteFileModal}
                    folderName={deleteFileName}
                    onDelete={() => {

                        deleteFile(deleteFileId);

                        setDeleteFileId(null);
                        setDeleteFileName("");

                        setShowDeleteFileModal(false);
                        setSelectedFileId(null);

                    }}
                    onCancel={() => {

                        setDeleteFileId(null);
                        setDeleteFileName("");

                        setShowDeleteFileModal(false);
                        setSelectedFileId(null);

                    }}
                />

                <PropertiesModal
                    isOpen={showPropertiesModal}
                    title={propertiesTitle}
                    onClose={() => {

                        setShowPropertiesModal(false);
                        setSelectedItem(null);
                        setPropertiesTitle("");

                    }}
                >

                    {selectedItem && (
                        <>
                            <p><strong>Name:</strong> {selectedItem.name}</p>

                            <p><strong>ID:</strong> {selectedItem.id}</p>

                            {"type" in selectedItem ? (
                                <>
                                    <p><strong>Type:</strong> {selectedItem.type}</p>
                                    <p><strong>Size:</strong> {selectedItem.size}</p>
                                </>
                            ) : (
                                <>
                                    <p>
                                        <strong>Folders:</strong>{" "}
                                        {
                                            folders.filter(
                                                folder => folder.parentFolderId === selectedItem.id
                                            ).length
                                        }
                                    </p>

                                    <p>
                                        <strong>Files:</strong>{" "}
                                        {
                                            files.filter(
                                                file => file.folderId === selectedItem.id
                                            ).length
                                        }
                                    </p>
                                </>
                            )}

                            {selectedItem.createdAt && (
                                <p><strong>Created:</strong> {selectedItem.createdAt}</p>
                            )}
                        </>
                    )}

                </PropertiesModal>

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
                                fileId={file.id}
                                fileName={file.name}
                                fileSize={file.size}
                                onMenuClick={(id, button) => {

                                    const rect = button.getBoundingClientRect();

                                    const menuWidth = 180;
                                    const menuHeight = 160;

                                    let x = rect.right + 4;
                                    let y = rect.bottom + 4;

                                    if (x + menuWidth > window.innerWidth) {
                                        x = rect.left - menuWidth - 4;
                                    }

                                    if (y + menuHeight > window.innerHeight) {
                                        y = rect.top - menuHeight - 4;
                                    }

                                    setSelectedFileId(id);

                                    setFileMenuPosition({
                                        x,
                                        y,
                                    });

                                }}
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

                                    const folder = folders.find(
                                        folder => folder.id === selectedFolderId
                                    );

                                    if (!folder) return;

                                    setSelectedItem(folder);
                                    setPropertiesTitle("Folder Properties");
                                    setShowPropertiesModal(true);

                                },
                            },
                        ]}
                    />

                    <ContextMenu
                        isOpen={selectedFileId !== null}
                        x={fileMenuPosition.x}
                        y={fileMenuPosition.y}
                        onClose={() => setSelectedFileId(null)}
                        items={[
                            {
                                label: "Rename",
                                onClick: () => {

                                    const file = files.find(
                                        file => file.id === selectedFileId
                                    );

                                    if (!file) return;

                                    setRenameFileId(file.id);
                                    setRenameFileName(file.name);

                                    setShowRenameFileModal(true);

                                },
                            },
                            {
                                label: "Download",
                                onClick: () => {
                                    downloadFile(selectedFileId);
                                    setSelectedFileId(null);
                                },
                            },
                            {
                                label: "Delete",
                                onClick: () => {

                                    const file = files.find(
                                        file => file.id === selectedFileId
                                    );

                                    if (!file) return;

                                    setDeleteFileId(file.id);
                                    setDeleteFileName(file.name);

                                    setShowDeleteFileModal(true);

                                },
                            },
                            {
                                label: "Properties",
                                onClick: () => {

                                    const file = files.find(
                                        file => file.id === selectedFileId
                                    );

                                    if (!file) return;

                                    setSelectedItem(file);
                                    setPropertiesTitle("File Properties");
                                    setShowPropertiesModal(true);

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