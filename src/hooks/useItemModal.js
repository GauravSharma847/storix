import { useState } from "react";

export const useItemModal = () => {
  const [item, setItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const openModal = selectedItem => {
    setItem(selectedItem);
    setValue(selectedItem?.name || "");
    setIsOpen(true);
  };

  const closeModal = () => {
    setItem(null);
    setValue("");
    setIsOpen(false);
  };

  return { item, isOpen, value, setValue, openModal, closeModal };
};
