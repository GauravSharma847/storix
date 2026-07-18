import { getFileSizeInBytes } from "./formatBytes";

/** Compares item names without treating upper/lower case as different. */
const byName = (first, second) => first.name.localeCompare(second.name, undefined, { sensitivity: "base" });
/** Compares optional creation dates; missing dates sort as the epoch. */
const byDate = (first, second) => new Date(first.createdAt || 0) - new Date(second.createdAt || 0);

/** Returns a sorted copy of folders without mutating context state. @param {Array} folders @param {string} sortBy @returns {Array} */
export const sortFolders = (folders, sortBy) => [...folders].sort((first, second) => {
  if (sortBy === "name-desc") return byName(second, first);
  if (sortBy === "date-asc") return byDate(first, second);
  if (sortBy === "date-desc") return byDate(second, first);
  return byName(first, second);
});

/** Returns a sorted copy of files, including type and numeric size sorting. @param {Array} files @param {string} sortBy @returns {Array} */
export const sortFiles = (files, sortBy) => [...files].sort((first, second) => {
  if (sortBy === "name-desc") return byName(second, first);
  if (sortBy === "type-asc") return String(first.type || "").localeCompare(String(second.type || ""));
  if (sortBy === "type-desc") return String(second.type || "").localeCompare(String(first.type || ""));
  if (sortBy === "size-asc") return getFileSizeInBytes(first.size) - getFileSizeInBytes(second.size);
  if (sortBy === "size-desc") return getFileSizeInBytes(second.size) - getFileSizeInBytes(first.size);
  if (sortBy === "date-asc") return byDate(first, second);
  if (sortBy === "date-desc") return byDate(second, first);
  return byName(first, second);
});
