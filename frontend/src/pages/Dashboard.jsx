import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Dashboard</h1>
        <button style={styles.logoutBtn} onClick={handleLogout}>
          Sair
        </button>
      </div>

      <div style={styles.buttonsContainer}>
        <button
          style={styles.button}
          onClick={() => navigate("/student-register")}
        >
          📝 Cadastrar Aluno
        </button>

        <button
          style={styles.button}
          onClick={() => navigate("/payments")}
        >
          💰 Realizar Pagamentos
        </button>

        <button
          style={styles.button}
          onClick={() => navigate("/tables")}
        >
          📊 Visualizar Tabelas
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
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  logoutBtn: {
    padding: "10px 20px",
    background: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
  buttonsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    maxWidth: "900px",
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

export default Dashboard;