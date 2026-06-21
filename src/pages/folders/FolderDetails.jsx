import React from 'react'
import { useParams } from 'react-router-dom'

const FolderDetails = () => {
    const { folderId } = useParams();
    return (
        <div>Folder {folderId}</div>
    )
}

export default FolderDetails