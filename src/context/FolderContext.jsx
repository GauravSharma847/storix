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

        if (!name.trim()) return;

        const newFolder = {
            id: Date.now(),
            name,
            parentFolderId,
        };

        setFolders(prev => [
            ...prev,
            newFolder,
        ]);
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
            id: Date.now(),
            folderId,
            name: selectedFile.name,
            size: `${(
                selectedFile.size / 1024
            ).toFixed(2)} KB`,
            type: selectedFile.type,
        };

        setFiles(prev => [
            ...prev,
            newFile,
        ]);
    };

    return (

        <FolderContext.Provider
            value={{
                folders,
                files,

                createFolder,
                uploadFile,
            }}
        >
            {children}
        </FolderContext.Provider>

    );
};

export const useFolder = () =>
    useContext(FolderContext);