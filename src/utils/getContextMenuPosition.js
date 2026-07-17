export const getContextMenuPosition = (button, width, height) => {
  const rect = button.getBoundingClientRect();
  let x = rect.right + 4;
  let y = rect.bottom + 4;

  if (x + width > window.innerWidth) x = rect.left - width - 4;
  if (y + height > window.innerHeight) y = rect.top - height - 4;

  return { x, y };
};
