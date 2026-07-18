import { useMemo, useState } from "react";
import Modal from "../common/Modal/Modal";
import Button from "../common/Button/Button";
import "./MoveModal.css";

const MoveModal = ({ isOpen, item, folders, itemType, onMove, onCancel }) => {
  const [destination, setDestination] = useState("");

  const destinations = useMemo(() => folders.filter(folder => String(folder.id) !== String(item?.id)), [folders, item]);
  if (!isOpen || !item) return null;

  return (
    <Modal isOpen={isOpen}>
      <h2>Move {itemType}</h2>
      <p className="move-description">Choose where to move <strong>{item.name}</strong>.</p>
      <label className="move-select"><span>Destination</span><select value={destination} onChange={event => setDestination(event.target.value)}><option value="">My Files (root)</option>{destinations.map(folder => <option key={folder.id} value={folder.id}>{folder.name}</option>)}</select></label>
      <div className="modal-actions"><Button onClick={() => onMove(destination === "" ? null : destination)}>Move</Button><Button variant="secondary" onClick={onCancel}>Cancel</Button></div>
    </Modal>
  );
};

export default MoveModal;
