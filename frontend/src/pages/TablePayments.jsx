import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function TablePayments() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [error, setError] = useState("");
  const [filterStudentId, setFilterStudentId] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [deleting, setDeleting] = useState(null);

  // Carregar lista de alunos
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/");
          return;
        }

        const response = await api.get("/students/lists/all?page=0&size=10000", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStudents(response.data.content || []);
      } catch (err) {
        console.log("Erro ao carregar alunos:", err.response?.data);
      } finally {
        setLoadingStudents(false);
      }
    };

    fetchStudents();
  }, [navigate]);

  // Carregar pagamentos
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/");
          return;
        }

        let url = "/payments/lists?page=0&size=1000";

        // Se tem um aluno selecionado, filtra por ele
        if (filterStudentId) {
          url += `&id=${filterStudentId}`;
        }

        const response = await api.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPayments(response.data.content || response.data || []);
      } catch (err) {
        console.log("Erro:", err.response?.data);
        setError("Erro ao carregar pagamentos");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [navigate, filterStudentId]);

  // Filtrar pagamentos por mês e ano
  const getFilteredPayments = () => {
    if (!filterMonth || !filterYear) {
      return payments;
    }

    return payments.filter((payment) => {
      const paymentDate = new Date(payment.paymentDate);
      const paymentMonth = String(paymentDate.getMonth() + 1).padStart(2, "0");
      const paymentYear = paymentDate.getFullYear().toString();

      return paymentMonth === filterMonth && paymentYear === filterYear;
    });
  };

  // Gerar anos disponíveis
  const getAvailableYears = () => {
    const years = new Set();
    payments.forEach((payment) => {
      const year = new Date(payment.paymentDate).getFullYear();
      years.add(year);
    });
    return Array.from(years).sort((a, b) => b - a);
  };

  // Gerar meses disponíveis
  const months = [
    { value: "01", label: "Janeiro" },
    { value: "02", label: "Fevereiro" },
    { value: "03", label: "Março" },
    { value: "04", label: "Abril" },
    { value: "05", label: "Maio" },
    { value: "06", label: "Junho" },
    { value: "07", label: "Julho" },
    { value: "08", label: "Agosto" },
    { value: "09", label: "Setembro" },
    { value: "10", label: "Outubro" },
    { value: "11", label: "Novembro" },
    { value: "12", label: "Dezembro" },
  ];

  const handleDelete = async (paymentId) => {
    if (!window.confirm("Tem certeza que deseja deletar este pagamento?")) {
      return;
    }

    try {
      setDeleting(paymentId);
      const token = localStorage.getItem("token");

      await api.delete(`/payments/delete/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove o pagamento da lista
      setPayments(payments.filter((payment) => payment.id !== paymentId));
      setOpenMenu(null);
    } catch (err) {
      console.log("Erro:", err.response?.data);
      alert("Erro ao deletar pagamento");
    } finally {
      setDeleting(null);
    }
  };

  const handleUpdate = (payment) => {
    // Navega para a página de Payments passando o pagamento
    navigate("/payments", { 
      state: { 
        paymentId: payment.id, 
        payment,
        action: "update"
      } 
    });
    setOpenMenu(null);
  };

  const toggleMenu = (paymentId) => {
    setOpenMenu(openMenu === paymentId ? null : paymentId);
  };

  const filteredPayments = getFilteredPayments();
  const availableYears = getAvailableYears();

  return (
    <div style={styles.container}>
      <button style={styles.backBtn} onClick={() => navigate("/tables")}>
        ← Voltar
      </button>

      <div style={styles.card}>
        <h2>Tabela de Pagamentos</h2>

        <div style={styles.filtersContainer}>
          <div style={styles.filterContainer}>
            <label style={styles.label}>Filtrar por Aluno:</label>
            <select
              value={filterStudentId}
              onChange={(e) => setFilterStudentId(e.target.value)}
              style={styles.filterSelect}
              disabled={loadingStudents}
            >
              <option value="">Todos os Alunos</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.filterContainer}>
            <label style={styles.label}>Mês:</label>
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="">Todos os Meses</option>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.filterContainer}>
            <label style={styles.label}>Ano:</label>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="">Todos os Anos</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : payments.length === 0 ? (
          <p>Nenhum pagamento encontrado</p>
        ) : filteredPayments.length === 0 ? (
          <p>Nenhum pagamento encontrado com os filtros selecionados</p>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Aluno</th>
                  <th style={styles.th}>Valor (R$)</th>
                  <th style={styles.th}>Data do Pagamento</th>
                  <th style={styles.th}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} style={styles.tr}>
                    <td style={styles.td}>{payment.id}</td>
                    <td style={styles.td}>{payment.student?.name || "N/A"}</td>
                    <td style={styles.td}>
                      R$ {parseFloat(payment.monthlyPayment).toFixed(2)}
                    </td>
                    <td style={styles.td}>{payment.paymentDate}</td>
                    <td style={styles.td}>
                      <div style={styles.menuContainer}>
                        <button
                          style={styles.menuBtn}
                          onClick={() => toggleMenu(payment.id)}
                          disabled={deleting === payment.id}
                        >
                          ⋯
                        </button>

                        {openMenu === payment.id && (
                          <div style={styles.dropdown}>
                            <button
                              style={styles.updateOption}
                              onClick={() => handleUpdate(payment)}
                              disabled={deleting === payment.id}
                            >
                              ✏️ Atualizar
                            </button>
                            <button
                              style={styles.deleteOption}
                              onClick={() => handleDelete(payment.id)}
                              disabled={deleting === payment.id}
                            >
                              {deleting === payment.id ? "Deletando..." : "🗑️ Deletar"}
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
  filterSelect: {
    padding: "8px 12px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px",
    cursor: "pointer",
    minWidth: "150px",
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
  menuContainer: {
    position: "relative",
  },
  menuBtn: {
    background: "transparent",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    padding: "5px 10px",
    borderRadius: "4px",
    transition: "background 0.2s",
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    right: "0",
    background: "white",
    border: "1px solid #ddd",
    borderRadius: "4px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    zIndex: "10",
    minWidth: "130px",
    marginTop: "5px",
  },
  updateOption: {
    width: "100%",
    padding: "10px 12px",
    border: "none",
    background: "white",
    color: "#28a745",
    cursor: "pointer",
    fontSize: "14px",
    textAlign: "left",
    transition: "background 0.2s",
    borderBottom: "1px solid #eee",
  },
  deleteOption: {
    width: "100%",
    padding: "10px 12px",
    border: "none",
    background: "white",
    color: "#dc3545",
    cursor: "pointer",
    fontSize: "14px",
    textAlign: "left",
    transition: "background 0.2s",
  },
};

export default TablePayments;