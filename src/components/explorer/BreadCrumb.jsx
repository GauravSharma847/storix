import { Link } from "react-router-dom";
import { useFolder } from "../../context/FolderContext";

const Breadcrumb = ({ currentFolderId }) => {

    const { folders } = useFolder();

    const breadcrumb = [];

    let currentFolder = folders.find(
        folder => folder.id === Number(currentFolderId)
    );

    while (currentFolder) {

        breadcrumb.unshift(currentFolder);

        currentFolder = folders.find(
            folder => folder.id === currentFolder.parentFolderId
        );
    }

    return (

        <div className="breadcrumb">

            <Link to="/files">
                📂 My Files
            </Link>

            {breadcrumb.map(folder => (

                <span key={folder.id}>

                    <span className="separator">
                        &gt;
                    </span>

                    <Link to={`/folders/${folder.id}`}>
                        {folder.name}
                    </Link>

                </span>

            ))}

        </div>

    );

};

export default Breadcrumb;