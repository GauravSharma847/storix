import React from 'react'
import "./FileCard.css"
import Button from '../../../components/common/Button/Button'

const FileCard = (props) => {
    return (
        <div className="file-card">

            <div className="file-main">

                <div className="file-icon">
                    📄
                </div>

                <div className="file-info">

                    <h3>{props.fileName}</h3>

                    <p>{props.fileSize}</p>

                </div>

            </div>

            <button
                className="file-menu-btn"
                onClick={(e) => {

                    e.stopPropagation();

                    console.log("File menu clicked");

                    if (props.onMenuClick) {

                        props.onMenuClick(
                            props.fileId,
                            e.currentTarget
                        );

                    }

                }}
            >
                ⋮
            </button>

        </div>
    )
}
export default FileCard;