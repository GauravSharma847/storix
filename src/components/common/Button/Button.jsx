import "./Button.css"

const Button = ({ className = "", type = "button", variant = "primary", children, ...props }) => {
    return (
        <button
            className={`btn btn--${variant} ${className}`}
            type={type}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button
