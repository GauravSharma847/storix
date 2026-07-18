import { useState } from "react";
import { getContextMenuPosition } from "../utils/getContextMenuPosition";

/** Manages the selected item and viewport-safe coordinates of a context menu. */
export const useContextMenu = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  /** Opens a menu for an item next to its trigger button. */
  const openMenu = (id, button, width, height) => {
    setSelectedId(id);
    setPosition(getContextMenuPosition(button, width, height));
  };

  /** Hides the menu and clears its active item. */
  const closeMenu = () => setSelectedId(null);

  return { selectedId, position, openMenu, closeMenu };
};
