import { Link } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import Button from "../../components/common/Button/Button";
import { useFolder } from "../../context/FolderContext";
import "./Collections.css";

const Collections = ({ mode }) => {
  const { folders, files, trash, restoreFromTrash, permanentlyDelete, emptyTrash, toggleFavorite } = useFolder();
  const isTrash = mode === "trash";
  const items = isTrash ? trash : [...folders.filter(item => item.isFavorite).map(item => ({ ...item, itemType: "folder" })), ...files.filter(item => item.isFavorite).map(item => ({ ...item, itemType: "file" }))];
  const title = isTrash ? "Trash" : "Favorites";

  return <AppLayout><section className="collection-page"><header className="collection-header"><div><p>{isTrash ? "RECOVER OR REMOVE" : "QUICK ACCESS"}</p><h1>{title}</h1><span>{items.length} item{items.length === 1 ? "" : "s"}</span></div>{isTrash && items.length > 0 && <Button variant="secondary" onClick={emptyTrash}>Empty trash</Button>}</header>{items.length === 0 ? <div className="collection-empty"><h2>{isTrash ? "Trash is empty" : "No favorites yet"}</h2><p>{isTrash ? "Deleted files and folders will appear here." : "Use the item menu to add files or folders to Favorites."}</p><Link to="/files">Go to My Files</Link></div> : <div className="collection-list">{items.map(item => <article className="collection-item" key={`${item.itemType}-${item.id}`}><div><strong>{item.name}</strong><span>{item.itemType === "file" ? `${item.type || "File"}${item.size ? ` · ${item.size}` : ""}` : "Folder"}</span></div>{isTrash ? <div className="collection-actions"><Button onClick={() => restoreFromTrash(item)}>Restore</Button><Button variant="danger" onClick={() => permanentlyDelete(item)}>Delete forever</Button></div> : <Button variant="secondary" onClick={() => toggleFavorite(item.itemType, item.id)}>Remove favorite</Button>}</article>)}</div>}</section></AppLayout>;
};

export default Collections;
