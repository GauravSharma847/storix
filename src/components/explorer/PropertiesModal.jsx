import React from 'react'
import Button from '../common/Button/Button';
import "./PropertiesModal.css"

const PropertiesModal = (props) => {
    if (!props.isOpen) return null;
    return (
        <div className='modal-overlay'>
            <div className='modal'>
                <h2>{props.title}</h2>
                <div className='properties-title'>
                    {props.children}
                </div>

                <Button onClick={props.onClose}>Close</Button>
            </div>
        </div>
    )
}

export default PropertiesModal