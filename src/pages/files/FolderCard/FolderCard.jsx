import React from 'react'
import { useNavigate } from "react-router-dom";
import "./FolderCard.css"

const FolderCard = (props) => {
    const navigate = useNavigate();
    return (
        <div className='folder-card'
            onClick={() => navigate(`/folders/${props.folderId}`)}
        >
            <div className='folder-icon'>
                📁
            </div>

            <div className='folder-info'>
                <h3>{props.folderName}</h3>
                <p>
                    {props.fileCount} Files
                </p>
            </div>
        </div>
    )
}

export default FolderCard