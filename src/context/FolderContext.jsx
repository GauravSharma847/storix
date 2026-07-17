import {
    createContext,
    useContext,
    useState,
} from "react";

import initialFolders from "../data/folders";
import initialFiles from "../data/files";

const FolderContext = createContext();

export const FolderProvider = ({ children }) => {

    const [folders, setFolders] = useState(initialFolders);
    const [files, setFiles] = useState(initialFiles);

    // -------------------------
    // Folder Operations
    // -------------------------

    const createFolder = (
        name,
        parentFolderId = null
    ) => {

        const trimmedName = name.trim();

        if (!trimmedName) return;

        const newFolder = {
            id: crypto.randomUUID(),
            name: trimmedName,
            parentFolderId,
            createdAt: new Date().toLocaleString(),
        };

        setFolders(prev => [
            ...prev,
            newFolder,
        ]);
    };

    const renameFolder = (folderId, newName) => {
        if (!newName.trim()) return;

        setFolders(prevFolders =>
            prevFolders.map(folder =>
                folder.id === folderId
                    ? {
                        ...folder,
                        name: newName,
                    }
                    : folder
            )
        );
    }

    const deleteFolder = (folderId) => {
        const folderIdsToDelete = new Set([String(folderId)]);
        let foundChild = true;

        while (foundChild) {
            foundChild = false;

            folders.forEach(folder => {
                if (
                    folderIdsToDelete.has(String(folder.parentFolderId)) &&
                    !folderIdsToDelete.has(String(folder.id))
                ) {
                    folderIdsToDelete.add(String(folder.id));
                    foundChild = true;
                }
            });
        }

        setFolders(prevFolders =>
            prevFolders.filter(
                folder => !folderIdsToDelete.has(String(folder.id))
            )
        );

        setFiles(prevFiles =>
            prevFiles.filter(
                file => !folderIdsToDelete.has(String(file.folderId))
            )
        );

    };

    // -------------------------
    // File Operations
    // -------------------------

    const uploadFile = (
        selectedFile,
        folderId
    ) => {

        if (!selectedFile) return;

        const newFile = {
            id: crypto.randomUUID(),
            folderId,
            name: selectedFile.name,
            size: `${(selectedFile.size / 1024).toFixed(2)} KB`,
            type: selectedFile.type,
            file: selectedFile,
            createdAt: new Date().toLocaleString(),
        };

        setFiles(prev => [
            ...prev,
            newFile,
        ]);
    };

    const renameFile = (fileId, newName) => {

        if (!newName.trim()) return;

        setFiles(prevFiles =>
            prevFiles.map(file =>
                file.id === fileId
                    ? {
                        ...file,
                        name: newName,
                    }
                    : file
            )
        );

    };

    const deleteFile = (fileId) => {
        setFiles(prevFiles =>
            prevFiles.filter(
                file => file.id !== fileId
            )
        );
    };

    const downloadFile = (fileId) => {

        const file = files.find(
            file => file.id === fileId
        );

        if (!file || !file.file) return;

        const url = URL.createObjectURL(file.file);

        const link = document.createElement("a");

        link.href = url;
        link.download = file.name;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);

    };
    return (

        <FolderContext.Provider
            value={{
                folders,
                files,

                createFolder,
                renameFolder,
                deleteFolder,

                renameFile,
                deleteFile,
                downloadFile,
                uploadFile,
            }}
        >
            {children}
        </FolderContext.Provider>

    );
};

// This hook is intentionally colocated with its provider.
// eslint-disable-next-line react-refresh/only-export-components
export const useFolder = () =>
    useContext(FolderContext);
