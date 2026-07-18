const ViewToggle = ({ value, onChange, label = "View" }) => (
  <div className="view-toggle" role="group" aria-label={label}>
    <button type="button" className={value === "list" ? "active" : ""} aria-pressed={value === "list"} onClick={() => onChange("list")}>List</button>
    <button type="button" className={value === "grid" ? "active" : ""} aria-pressed={value === "grid"} onClick={() => onChange("grid")}>Grid</button>
  </div>
);

export default ViewToggle;
