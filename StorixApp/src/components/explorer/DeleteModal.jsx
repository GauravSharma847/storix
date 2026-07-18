import Modal from "../common/Modal/Modal";
import Button from "../common/Button/Button";

import "./DeleteModal.css";

const DeleteFolderModal = ({
    isOpen,
    folderName,
    onDelete,
    onCancel,
    title = "Delete Folder",
    itemLabel = "folder",
}) => {

    return (

        <Modal isOpen={isOpen}>

            <h2>{title}</h2>

            <p className="delete-message">
                Are you sure you want to delete this {itemLabel}
                <strong> "{folderName}" </strong>?
            </p>

            <p className="delete-warning">
                This action cannot be undone.
            </p>

            <div className="delete-folder-actions">

                <Button
                    variant="danger"
                    onClick={onDelete}
                >
                    Delete
                </Button>

                <Button variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>

            </div>

        </Modal>

    );

};

export default DeleteFolderModal;
