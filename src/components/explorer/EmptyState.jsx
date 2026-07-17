const EmptyState = ({ title, description, action, icon = "📂" }) => (
  <div className="empty-state">
    <div className="empty-state-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
    {action}
  </div>
);

export default EmptyState;
