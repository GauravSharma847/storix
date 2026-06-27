import React from 'react'
import "./Input.css"

const Input = (props) => {
    return (
        <div className='input-group'>
            <label>
                {props.label}
            </label>

            <input
                type={props.type || "text"}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    )
}

export default Input;