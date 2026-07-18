import "./Input.css"

const Input = ({ label, error, id, type = "text", ...props }) => {
    return (
        <div className='input-group'>
            <label htmlFor={id}>
                {label}
            </label>

            <input
                id={id}
                type={type}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${id}-error` : undefined}
                {...props}
            />
            {error && <span id={`${id}-error`} className="input-error">{error}</span>}
        </div>
    )
}

export default Input;
