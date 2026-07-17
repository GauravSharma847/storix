import Button from "../Button/Button";

const ModalActions = ({ onConfirm, onCancel, confirmLabel = "Save", disabled = false, danger = false }) => (
  <div className="modal-actions">
    <Button variant={danger ? "danger" : "primary"} onClick={onConfirm} disabled={disabled}>
      {confirmLabel}
    </Button>
    <Button variant="secondary" onClick={onCancel}>Cancel</Button>
  </div>
);

export default ModalActions;
