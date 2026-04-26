export default function Loading() {
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
        <div style={{
          fontSize: "2rem",
          marginBottom: "1rem",
          animation: "pulse 1s ease-in-out infinite"
        }}>
          $
        </div>
        <h1 style={{ fontSize: "1rem", fontWeight: "normal" }}>
          carregando...
        </h1>
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}