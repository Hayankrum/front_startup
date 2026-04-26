export default function TerminalForm({ onSubmit, title, children, loading }) {
  return (
    <div className="form-container">
      <div className="page-header">
        <h1>{title}</h1>
      </div>
      
      <form onSubmit={onSubmit}>
        {children}
        
        <div className="form-group">
          <button type="submit" disabled={loading}>
            {loading ? "[processando...]" : "[salvar]"}
          </button>
        </div>
      </form>
    </div>
  );
}