import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function TableMonthlyPerYear() {
  const navigate = useNavigate();
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [availableYears, setAvailableYears] = useState([]);

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  // Carregar dados da view
  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/");
          return;
        }

        let url = "/view/monthlys/all?page=0&size=1000";

        if (filterYear) {
          url += `&year=${filterYear}`;
        }

        const response = await api.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data.content || response.data || [];
        setMonthlyData(data);

        // Extrair anos disponíveis
        const years = new Set();
        data.forEach((item) => {
          years.add(item.year);
        });
        setAvailableYears(Array.from(years).sort((a, b) => b - a));
      } catch (err) {
        console.log("Erro:", err.response?.data);
        setError("Erro ao carregar dados");
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyData();
  }, [navigate, filterYear]);

  // Calcular total
  const calculateTotal = () => {
    return monthlyData.reduce((acc, item) => acc + parseFloat(item.totalValue), 0);
  };

  const total = calculateTotal();

  return (
    <div style={styles.container}>
      <button style={styles.backBtn} onClick={() => navigate("/tables")}>
        ← Voltar
      </button>

      <div style={styles.card}>
        <h2>Faturamento por Ano</h2>

        <div style={styles.filtersContainer}>
          <div style={styles.filterContainer}>
            <label style={styles.label}>Filtrar por Ano:</label>
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
        ) : monthlyData.length === 0 ? (
          <p>Nenhum dado encontrado</p>
        ) : (
          <>
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Ano</th>
                    <th style={styles.th}>Mês</th>
                    <th style={styles.th}>Faturamento (R$)</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.map((item, index) => (
                    <tr key={index} style={styles.tr}>
                      <td style={styles.td}>{item.year}</td>
                      <td style={styles.td}>{months[item.month - 1]}</td>
                      <td style={styles.td}>
                        R$ {parseFloat(item.totalValue).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={styles.totalContainer}>
              <span style={styles.totalLabel}>Total Faturado:</span>
              <span style={styles.totalValue}>R$ {total.toFixed(2)}</span>
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
  totalContainer: {
    marginTop: "30px",
    background: "#f9f9f9",
    padding: "15px",
    borderRadius: "6px",
    border: "2px solid #28a745",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: "16px",
    color: "#666",
    fontWeight: "500",
  },
  totalValue: {
    fontSize: "24px",
    color: "#28a745",
    fontWeight: "bold",
  },
};

export default TableMonthlyPerYear;