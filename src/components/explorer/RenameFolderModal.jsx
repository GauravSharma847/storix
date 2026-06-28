import Modal from "../common/Modal/Modal";
import Input from "../common/Input/Input";
import Button from "../common/Button/Button";

import "./RenameFolderModal.css";

const RenameFolderModal = ({
    isOpen,
    folderName,
    setFolderName,
    onRename,
    onCancel,
}) => {

    return (

        <Modal isOpen={isOpen}>

            <h2>Rename Folder</h2>

            <Input
                label="Folder Name"
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

                <Button onClick={onCancel}>
                    Cancel
                </Button>

            </div>

        </Modal>

    );

};

export default RenameFolderModal;