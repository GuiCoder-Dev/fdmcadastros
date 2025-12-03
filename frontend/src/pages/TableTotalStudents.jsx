import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function TableTotalStudents() {
  const navigate = useNavigate();
  const [totalStudents, setTotalStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterStudentName, setFilterStudentName] = useState("");

  // Carregar dados da view
  useEffect(() => {
    const fetchTotalStudents = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/");
          return;
        }

        const url = "/view/paids/list/all?page=0&size=1000";

        const response = await api.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTotalStudents(response.data.content || response.data || []);
      } catch (err) {
        console.log("Erro:", err.response?.data);
        setError("Erro ao carregar dados");
      } finally {
        setLoading(false);
      }
    };

    fetchTotalStudents();
  }, [navigate]);

  // Filtrar por nome
  const getFilteredStudents = () => {
    if (!filterStudentName) {
      return totalStudents;
    }

    return totalStudents.filter((student) =>
      student.studentName.toLowerCase().includes(filterStudentName.toLowerCase())
    );
  };

  const filteredStudents = getFilteredStudents();

  // Calcular totais
  const calculateTotals = () => {
    return filteredStudents.reduce(
      (acc, student) => ({
        registrationFee: acc.registrationFee + parseFloat(student.registrationFee),
        totalMonthlyPayments: acc.totalMonthlyPayments + parseFloat(student.totalMonthlyPayments),
        totalPaid: acc.totalPaid + parseFloat(student.totalPaid),
      }),
      { registrationFee: 0, totalMonthlyPayments: 0, totalPaid: 0 }
    );
  };

  const totals = calculateTotals();

  return (
    <div style={styles.container}>
      <button style={styles.backBtn} onClick={() => navigate("/tables")}>
        ← Voltar
      </button>

      <div style={styles.card}>
        <h2>Total por Aluno</h2>

        <div style={styles.filtersContainer}>
          <div style={styles.filterContainer}>
            <label style={styles.label}>Filtrar por Nome:</label>
            <input
              type="text"
              value={filterStudentName}
              onChange={(e) => setFilterStudentName(e.target.value)}
              style={styles.filterInput}
              placeholder="Digite o nome"
            />
          </div>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : totalStudents.length === 0 ? (
          <p>Nenhum aluno encontrado</p>
        ) : filteredStudents.length === 0 ? (
          <p>Nenhum aluno encontrado com os filtros selecionados</p>
        ) : (
          <>
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Nome</th>
                    <th style={styles.th}>Taxa de Registro (R$)</th>
                    <th style={styles.th}>Total Mensalidades (R$)</th>
                    <th style={styles.th}>Total Pago (R$)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.studentId} style={styles.tr}>
                      <td style={styles.td}>{student.studentId}</td>
                      <td style={styles.td}>{student.studentName}</td>
                      <td style={styles.td}>
                        R$ {parseFloat(student.registrationFee).toFixed(2)}
                      </td>
                      <td style={styles.td}>
                        R$ {parseFloat(student.totalMonthlyPayments).toFixed(2)}
                      </td>
                      <td style={styles.td}>
                        R$ {parseFloat(student.totalPaid).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={styles.totalsContainer}>
              <div style={styles.totalCard}>
                <span style={styles.totalLabel}>Total Taxa de Registro:</span>
                <span style={styles.totalValue}>
                  R$ {totals.registrationFee.toFixed(2)}
                </span>
              </div>
              <div style={styles.totalCard}>
                <span style={styles.totalLabel}>Total Mensalidades:</span>
                <span style={styles.totalValue}>
                  R$ {totals.totalMonthlyPayments.toFixed(2)}
                </span>
              </div>
              <div style={styles.totalCard}>
                <span style={styles.totalLabel}>Total Geral:</span>
                <span style={styles.totalValue}>
                  R$ {totals.totalPaid.toFixed(2)}
                </span>
              </div>
            </div>
          </>
        )}
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
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "8px",
    maxWidth: "1200px",
    margin: "0 auto",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  filtersContainer: {
    marginBottom: "20px",
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    alignItems: "flex-end",
  },
  filterContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  label: {
    fontWeight: "500",
    color: "#333",
    fontSize: "14px",
  },
  filterInput: {
    padding: "8px 12px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px",
    minWidth: "200px",
  },
  tableWrapper: {
    overflowX: "auto",
    marginTop: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
  },
  th: {
    padding: "12px",
    background: "#28a745",
    color: "white",
    textAlign: "left",
    fontWeight: "bold",
    borderBottom: "2px solid #1e7e34",
  },
  tr: {
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "10px 12px",
  },
  totalsContainer: {
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px",
  },
  totalCard: {
    background: "#f9f9f9",
    padding: "15px",
    borderRadius: "6px",
    border: "2px solid #28a745",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  totalLabel: {
    fontSize: "14px",
    color: "#666",
    fontWeight: "500",
  },
  totalValue: {
    fontSize: "24px",
    color: "#28a745",
    fontWeight: "bold",
  },
};

export default TableTotalStudents;