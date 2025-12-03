import { useNavigate } from "react-router-dom";

function Tables() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <button style={styles.backBtn} onClick={() => navigate("/dashboard")}>
        ← Voltar
      </button>

      <div style={styles.header}>
        <h1>Visualizar Tabelas</h1>
      </div>

      <div style={styles.buttonsContainer}>
        <button
          style={styles.button}
          onClick={() => navigate("/table-students")}
        >
          👥 Tabela de Alunos
        </button>

        <button
          style={styles.button}
          onClick={() => navigate("/table-payments")}
        >
          💳 Tabela de Pagamentos
        </button>

        <button
          style={styles.button}
          onClick={() => navigate("/table-total-students")}
        >
          📊 Total por Aluno
        </button>

        <button
          style={styles.button}
          onClick={() => navigate("/table-monthly-per-year")}
        >
          📈 Faturamento por Ano
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f5f5f5",
    padding: "20px",
  },
  backBtn: {
    padding: "10px 20px",
    background: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  header: {
    marginBottom: "40px",
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  buttonsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  button: {
    padding: "40px 20px",
    fontSize: "18px",
    fontWeight: "bold",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    minHeight: "150px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
};

export default Tables;