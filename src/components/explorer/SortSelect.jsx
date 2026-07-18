const folderOptions = [
  ["name-asc", "Name (A-Z)"],
  ["name-desc", "Name (Z-A)"],
  ["date-desc", "Newest first"],
  ["date-asc", "Oldest first"],
];

const fileOptions = [
  ...folderOptions,
  ["type-asc", "Type (A-Z)"],
  ["type-desc", "Type (Z-A)"],
  ["size-desc", "Size (largest first)"],
  ["size-asc", "Size (smallest first)"],
];

const SortSelect = ({ value, onChange, kind = "folder", label = "Sort by" }) => {
  const options = kind === "file" ? fileOptions : folderOptions;
  return <label className="sort-select"><span>{label}</span><select value={value} onChange={event => onChange(event.target.value)}>{options.map(([optionValue, optionLabel]) => <option key={optionValue} value={optionValue}>{optionLabel}</option>)}</select></label>;
};

export default SortSelect;
