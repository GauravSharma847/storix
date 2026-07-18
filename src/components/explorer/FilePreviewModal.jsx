import { useEffect, useMemo } from "react";
import Modal from "../common/Modal/Modal";
import Button from "../common/Button/Button";
import "./FilePreviewModal.css";

const FilePreviewModal = ({ file, onClose }) => {
  const isImage = file?.type === "image" || file?.type?.startsWith("image/");
  const isPdf = file?.type === "pdf" || file?.type === "application/pdf";
  const url = useMemo(() => file?.file && (isImage || isPdf) ? URL.createObjectURL(file.file) : "", [file, isImage, isPdf]);

  useEffect(() => () => { if (url) URL.revokeObjectURL(url); }, [url]);

  if (!file) return null;
  return <Modal isOpen={Boolean(file)}><div className="preview-header"><div><p>FILE PREVIEW</p><h2>{file.name}</h2></div><button onClick={onClose} aria-label="Close preview">x</button></div>{isImage ? (url ? <img className="file-preview-image" src={url} alt={file.name} /> : <div className="preview-placeholder">Image preview is available after you upload an image.</div>) : isPdf && url ? <iframe className="file-preview-document" src={url} title={file.name} /> : <div className="preview-placeholder"><strong>{file.type || "File"}</strong><span>Preview is not available for this file type. You can still download it from the actions menu.</span></div>}<div className="modal-actions"><Button variant="secondary" onClick={onClose}>Close</Button></div></Modal>;
};

export default FilePreviewModal;
