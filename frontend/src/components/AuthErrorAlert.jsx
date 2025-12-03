function AuthErrorAlert({ error, onClose }) {
  if (!error) return null;

  const bgColor = "#f8d7da";
  const textColor = "#721c24";
  const borderColor = "#f5c6cb";

  return (
    <div
      style={{
        padding: "15px",
        background: bgColor,
        color: textColor,
        borderRadius: "4px",
        border: `1px solid ${borderColor}`,
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        animation: "slideDown 0.3s ease-in-out",
      }}
    >
      <div>
        <strong>❌ Erro na autenticação</strong>
        <p style={{ margin: "8px 0 0 0", fontSize: "14px" }}>
          {error.message}
        </p>
        {error.code && (
          <small style={{ color: textColor, opacity: 0.8 }}>
            Código: {error.code}
          </small>
        )}
      </div>
      <button
        onClick={onClose}
        style={{
          background: "transparent",
          border: "none",
          color: textColor,
          cursor: "pointer",
          fontSize: "20px",
          padding: "0 10px",
        }}
      >
        ✕
      </button>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default AuthErrorAlert;