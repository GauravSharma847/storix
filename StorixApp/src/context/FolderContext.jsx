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
    const [trash, setTrash] = useState([]);
    const [selection, setSelection] = useState({ folder: new Set(), file: new Set() });
    const [previewFile, setPreviewFile] = useState(null);

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

        const removedFolders = folders.filter(folder => folderIdsToDelete.has(String(folder.id)));
        const removedFiles = files.filter(file => folderIdsToDelete.has(String(file.folderId)));

        setTrash(prev => [...prev, ...removedFolders.map(item => ({ ...item, itemType: "folder", deletedAt: new Date().toISOString() })), ...removedFiles.map(item => ({ ...item, itemType: "file", deletedAt: new Date().toISOString() }))]);

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

    const moveFolder = (folderId, parentFolderId) => {
        if (String(folderId) === String(parentFolderId)) return;

        const descendants = new Set([String(folderId)]);
        let foundChild = true;
        while (foundChild) {
            foundChild = false;
            folders.forEach(folder => {
                if (descendants.has(String(folder.parentFolderId)) && !descendants.has(String(folder.id))) {
                    descendants.add(String(folder.id));
                    foundChild = true;
                }
            });
        }
        if (parentFolderId !== null && descendants.has(String(parentFolderId))) return;

        setFolders(prev => prev.map(folder => String(folder.id) === String(folderId) ? { ...folder, parentFolderId } : folder));
    };

    const toggleFavorite = (itemType, itemId) => {
        const setter = itemType === "file" ? setFiles : setFolders;
        setter(prev => prev.map(item => String(item.id) === String(itemId) ? { ...item, isFavorite: !item.isFavorite } : item));
    };

    const toggleSelection = (itemType, itemId) => {
        setSelection(prev => {
            const next = new Set(prev[itemType]);
            const id = String(itemId);
            if (next.has(id)) next.delete(id); else next.add(id);
            return { ...prev, [itemType]: next };
        });
    };

    const clearSelection = () => setSelection({ folder: new Set(), file: new Set() });
    const openPreview = file => setPreviewFile(file);
    const closePreview = () => setPreviewFile(null);

    // -------------------------
    // File Operations
    // -------------------------

    const uploadFiles = (selectedFiles, folderId) => {
        const uploads = Array.from(selectedFiles || []).filter(Boolean).map(selectedFile => ({
            id: crypto.randomUUID(),
            folderId,
            name: selectedFile.name,
            size: `${(selectedFile.size / 1024).toFixed(2)} KB`,
            type: selectedFile.type || "file",
            file: selectedFile,
            createdAt: new Date().toLocaleString(),
        }));
        if (uploads.length) setFiles(prev => [...prev, ...uploads]);
    };

    const uploadFile = (selectedFile, folderId) => uploadFiles(selectedFile ? [selectedFile] : [], folderId);

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
        const removedFile = files.find(file => String(file.id) === String(fileId));
        if (removedFile) setTrash(prev => [...prev, { ...removedFile, itemType: "file", deletedAt: new Date().toISOString() }]);
        setFiles(prevFiles =>
            prevFiles.filter(
                file => file.id !== fileId
            )
        );
    };

    const moveFile = (fileId, folderId) => setFiles(prev => prev.map(file => String(file.id) === String(fileId) ? { ...file, folderId } : file));

    const restoreFromTrash = item => {
        if (item.itemType === "folder") {
            const folder = { ...item };
            delete folder.itemType;
            delete folder.deletedAt;
            setFolders(prev => prev.some(existing => String(existing.id) === String(folder.id)) ? prev : [...prev, folder]);
        } else {
            const file = { ...item };
            delete file.itemType;
            delete file.deletedAt;
            setFiles(prev => prev.some(existing => String(existing.id) === String(file.id)) ? prev : [...prev, file]);
        }
        setTrash(prev => prev.filter(trashed => !(trashed.itemType === item.itemType && String(trashed.id) === String(item.id))));
    };

    const permanentlyDelete = item => setTrash(prev => prev.filter(trashed => !(trashed.itemType === item.itemType && String(trashed.id) === String(item.id))));

    const emptyTrash = () => setTrash([]);

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
                trash,
                selection,
                previewFile,

                createFolder,
                renameFolder,
                deleteFolder,
                moveFolder,
                toggleFavorite,
                toggleSelection,
                clearSelection,
                openPreview,
                closePreview,

                renameFile,
                deleteFile,
                downloadFile,
                uploadFile,
                uploadFiles,
                moveFile,
                restoreFromTrash,
                permanentlyDelete,
                emptyTrash,
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
