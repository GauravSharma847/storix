import React from "react";
import { useNavigate } from "react-router-dom";
import "./FolderCard.css";

const FolderCard = (props) => {

    const navigate = useNavigate();

    return (

        <div className="folder-card">

            <div
                className="folder-main"
                onClick={() =>
                    navigate(`/folders/${props.folderId}`)
                }
            >

                <div className="folder-icon">
                    📁
                </div>

                <div className="folder-info">

                    <h3>{props.folderName}</h3>

                    <p>{props.fileCount} Files</p>

                </div>

            </div>

            <button
                className="folder-menu-btn"
                onClick={(e) => {

                    e.stopPropagation();

                    if (props.onMenuClick) {

                        props.onMenuClick(
                            props.folderId,
                            e.currentTarget
                        );

                    }

                }}
            >
                ⋮
            </button>

        </div>

    );

};

export default FolderCard;