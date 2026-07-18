/** Formats a stored timestamp using the visitor's locale. @param {string|number|Date} value @returns {string} */
export const formatDate = value => {
  if (!value) return "Not available";
  return new Date(value).toLocaleString();
};
