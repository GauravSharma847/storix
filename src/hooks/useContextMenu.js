import { useState } from "react";
import { getContextMenuPosition } from "../utils/getContextMenuPosition";

export const useContextMenu = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const openMenu = (id, button, width, height) => {
    setSelectedId(id);
    setPosition(getContextMenuPosition(button, width, height));
  };

  const closeMenu = () => setSelectedId(null);

  return { selectedId, position, openMenu, closeMenu };
};
