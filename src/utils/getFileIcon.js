const extensionIcons = {
  pdf: "📄",
  doc: "📑",
  docx: "📑",
  xls: "📊",
  xlsx: "📊",
  ppt: "📊",
  pptx: "📊",
  mp3: "🎵",
  wav: "🎵",
  mp4: "🎥",
  mov: "🎥",
  zip: "🗜️",
};

export const getFileIcon = file => {
  if (file.type?.startsWith("image/") || file.type === "image") return "🖼️";
  if (file.type?.startsWith("video/") || file.type === "video") return "🎥";
  if (file.type?.startsWith("audio/")) return "🎵";

  const extension = file.name?.split(".").pop()?.toLowerCase();
  return extensionIcons[extension] || "📄";
};
