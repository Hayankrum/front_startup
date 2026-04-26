import { Link } from "react-router-dom";
// Remove esta linha: import "./TerminalCard.css";

export default function TerminalCard({ 
  id, 
  title, 
  description, 
  price, 
  onEdit, 
  onDelete,
  showActions = true 
}) {
  const token = localStorage.getItem("token");

  return (
    <div className="terminal-card">
      <div className="card-title">{title}</div>
      <div className="card-content">
        {description && <p>{description.substring(0, 80)}...</p>}
        {price && <div className="card-price">R$ {price}</div>}
      </div>
      
      {showActions && (
        <div className="card-actions">
          <Link to={`/anuncios/${id}`}>[ver]</Link>
          {token && (
            <>
              <Link to={`/anuncios/${id}/editar`}>[editar]</Link>
              <button onClick={() => onDelete?.(id)}>[excluir]</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}