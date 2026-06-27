// import Input from "../common/Input/Input";
// import Button from "../common/Button/Button";
import Button from "../common/Button/Button";
import Input from "../common/Input/Input";
import Modal from "../common/Modal/Modal";

const CreateFolderModal = ({
    isOpen,
    folderName,
    setFolderName,
    onCreate,
    onCancel
}) => {

    return (

        <Modal isOpen={isOpen}>

            <h2>Create Folder</h2>

            <Input
                label="Folder Name"
                placeholder="Enter folder name"
                value={folderName}
                onChange={(e) =>
                    setFolderName(e.target.value)
                }
            />

            <div className="folder-modal-actions">

                <Button onClick={onCreate}>
                    Create
                </Button>

                <Button onClick={onCancel}>
                    Cancel
                </Button>

            </div>

        </Modal>

    );

};

export default CreateFolderModal;