const colors = [
  "#667eea", "#f093fb", "#4facfe", "#43e97b",
  "#fa709a", "#fee140", "#a18cd1", "#fda085",
  "#84fab0", "#f6d365"
];

function UserCard({ id, name, email, phone, city, onDelete, index }) {
  const color = colors[index % colors.length];

  return (
    <div className="user-card" style={{ borderTop: `4px solid ${color}` }}>
      
      <div className="card-id" style={{ backgroundColor: color }}>
        #{id}
      </div>

      <img
        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
        alt={name}
        width="80"
        style={{ borderRadius: "50%", marginBottom: "10px", border: `3px solid ${color}` }}
      />

      <h2 style={{ color: color }}>👤 {name}</h2>
      <p>📧 {email}</p>
      <p>📞 {phone}</p>
      <p>🏙️ {city}</p>

      <button className="delete-btn" onClick={onDelete}>
        🗑️ Supprimer
      </button>
    </div>
  );
}

export default UserCard;