import { useEffect, useRef } from "react";
import "./ContextMenu.css";

const ContextMenu = ({
    isOpen,
    x,
    y,
    items,
    onClose,
}) => {

    const menuRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return undefined;

        const handlePointerDown = event => {
            if (!menuRef.current?.contains(event.target)) {
                onClose?.();
            }
        };

        const handleKeyDown = event => {
            if (event.key === "Escape") {
                onClose?.();
            }
        };

        document.addEventListener("mousedown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (

        <div
            ref={menuRef}
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
