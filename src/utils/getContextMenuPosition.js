/**
 * Positions an item menu beside its trigger while keeping it inside the viewport.
 * @param {HTMLElement} button Triggering three-dot button.
 * @param {number} width Expected menu width.
 * @param {number} height Expected menu height.
 * @returns {{x: number, y: number}}
 */
export const getContextMenuPosition = (button, width, height) => {
  const rect = button.getBoundingClientRect();
  let x = rect.right + 4;
  let y = rect.bottom + 4;

  if (x + width > window.innerWidth) x = rect.left - width - 4;
  if (y + height > window.innerHeight) y = rect.top - height - 4;

  // The final clamp also covers menus opened near a viewport corner.
  x = Math.max(8, Math.min(x, window.innerWidth - width - 8));
  y = Math.max(8, Math.min(y, window.innerHeight - height - 8));

  return { x, y };
};
