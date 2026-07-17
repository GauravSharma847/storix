import Modal from "../common/Modal/Modal";
import Input from "../common/Input/Input";
import Button from "../common/Button/Button";

import "./RenameModal.css";

const RenameFolderModal = ({
    isOpen,
    folderName,
    setFolderName,
    onRename,
    onCancel,
    title = "Rename Folder",
    label = "Folder Name",
}) => {

    return (

        <Modal isOpen={isOpen}>

            <h2>{title}</h2>

            <Input
                label={label}
                value={folderName}
                onChange={(e) =>
                    setFolderName(e.target.value)
                }
            />

            <div className="rename-folder-actions">

                <Button
                    onClick={onRename}
                    disabled={!folderName.trim()}
                >
                    Rename
                </Button>

                <Button variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>

            </div>

        </Modal>

    );

};

export default RenameFolderModal;
