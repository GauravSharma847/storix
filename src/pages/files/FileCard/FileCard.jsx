import React from 'react'
import "./FileCard.css"
import Button from '../../../components/common/Button/Button'

const FileCard = (props) => {
    return (
        <div className='file-card'>
            <div className='file-info'>
                <h3>{props.fileName}</h3>
                <p>{props.fileSize}</p>
            </div>
            <div className='file-actions'>
                <Button>Download</Button>
                <Button>Delete</Button>
            </div>
        </div>
    )
}

export default FileCard;