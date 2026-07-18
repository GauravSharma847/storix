import { useState } from "react";

/** Shares common state for dialogs that operate on a single file or folder. */
export const useItemModal = () => {
  const [item, setItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  /** Opens the modal and seeds its editable value from the selected item name. */
  const openModal = selectedItem => {
    setItem(selectedItem);
    setValue(selectedItem?.name || "");
    setIsOpen(true);
  };

  /** Resets modal state after cancellation or a completed action. */
  const closeModal = () => {
    setItem(null);
    setValue("");
    setIsOpen(false);
  };

  return { item, isOpen, value, setValue, openModal, closeModal };
};
