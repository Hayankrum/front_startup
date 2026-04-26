export default function StatusPage({ icon, title, subtitle }) {
  return (
    <div className="page-container">
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center"
      }}>
        {icon && (
          <img 
            src={icon} 
            alt="status" 
            style={{
              width: "64px",
              height: "64px",
              marginBottom: "1.5rem",
              opacity: 0.7
            }} 
          />
        )}
        
        <h1 style={{ 
          fontSize: "1.2rem", 
          fontWeight: "normal",
          marginBottom: "0.5rem",
          color: "var(--text-main)"
        }}>
          {title}
        </h1>
        
        {subtitle && (
          <p style={{ 
            fontSize: "0.8rem", 
            color: "var(--text-soft)" 
          }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}