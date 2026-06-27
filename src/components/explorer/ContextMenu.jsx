import "./ContextMenu.css";

const ContextMenu = ({
    isOpen,
    x,
    y,
    items,
    onClose,
}) => {

    if (!isOpen) return null;

    return (

        <div
            className="context-menu"
            style={{
                left: x,
                top: y,
            }}
        >

            {items.map((item, index) => (

                <button
                    key={index}
                    className="context-menu-item"
                    onClick={() => {

                        item.onClick();

                        if (onClose) {
                            onClose();
                        }

                    }}
                >

                    {item.label}

                </button>

            ))}

        </div>

    );

};

export default ContextMenu;