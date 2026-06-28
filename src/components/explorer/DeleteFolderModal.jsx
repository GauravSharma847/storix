import Modal from "../common/Modal/Modal";
import Button from "../common/Button/Button";

import "./DeleteFolderModal.css";

const DeleteFolderModal = ({
    isOpen,
    folderName,
    onDelete,
    onCancel,
}) => {

    return (

        <Modal isOpen={isOpen}>

            <h2>Delete Folder</h2>

            <p className="delete-message">
                Are you sure you want to delete
                <strong> "{folderName}" </strong>?
            </p>

            <p className="delete-warning">
                This action cannot be undone.
            </p>

            <div className="delete-folder-actions">

                <Button
                    className="delete-btn"
                    onClick={onDelete}
                >
                    Delete
                </Button>

                <Button onClick={onCancel}>
                    Cancel
                </Button>

            </div>

        </Modal>

    );

};

export default DeleteFolderModal;