function FormErrorAlert({ generalError, onClose }) {
  if (!generalError) return null;

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
      }}
    >
      <div>
        <strong>❌ Erro na validação</strong>
        <p style={{ margin: "8px 0 0 0", fontSize: "14px" }}>
          {generalError.message}
        </p>
        <small style={{ color: textColor, opacity: 0.8 }}>
          Código: {generalError.code}
        </small>
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
    </div>
  );
}

export default FormErrorAlert;