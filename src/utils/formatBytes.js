export const getFileSizeInBytes = size => {
  const match = String(size).match(/([\d.]+)\s*(KB|MB|GB|B)/i);
  if (!match) return 0;

  const units = { B: 1, KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3 };
  return Number(match[1]) * units[match[2].toUpperCase()];
};

export const formatBytes = bytes => {
  if (!bytes) return "0 KB";
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
};
