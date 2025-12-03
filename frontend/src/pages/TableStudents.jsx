import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function TableStudents() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [filterClass, setFilterClass] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/");
          return;
        }

        let url = "";
        if (filter === "all") {
          url = "/students/lists/all?page=0&size=100";
        } else if (filter === "actives") {
          url = "/students/lists/actives?page=0&size=100";
        }

        const response = await api.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStudents(response.data.content || []);
      } catch (err) {
        console.log("Erro:", err.response?.data);
        setError("Erro ao carregar alunos");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [navigate, filter]);

  // Filtrar alunos por turma
  const getFilteredStudents = () => {
    if (!filterClass) {
      return students;
    }
    return students.filter((student) => student.className === filterClass);
  };

  const handleDelete = async (studentId) => {
    if (!window.confirm("Tem certeza que deseja deletar este aluno?")) {
      return;
    }

    try {
      setDeleting(studentId);
      const token = localStorage.getItem("token");

      await api.delete(`/students/delete/${studentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove o aluno da lista
      setStudents(students.filter((student) => student.id !== studentId));
      setOpenMenu(null);
    } catch (err) {
      console.log("Erro:", err.response?.data);
      alert("Erro ao deletar aluno");
    } finally {
      setDeleting(null);
    }
  };

  const handleUpdate = (student) => {
    // Navega para a página de StudentRegister passando o aluno completo
    navigate("/student-register", { state: { studentId: student.id, student } });
    setOpenMenu(null);
  };

  const toggleMenu = (studentId) => {
    setOpenMenu(openMenu === studentId ? null : studentId);
  };

  const filteredStudents = getFilteredStudents();
  const classes = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

  return (
    <div style={styles.container}>
      <button style={styles.backBtn} onClick={() => navigate("/tables")}>
        ← Voltar
      </button>

      <div style={styles.card}>
        <h2>Tabela de Alunos</h2>

        <div style={styles.filtersContainer}>
          <div style={styles.filterContainer}>
            <label style={styles.label}>Filtrar por Status:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="all">Todos os Alunos</option>
              <option value="actives">Apenas Ativos</option>
            </select>
          </div>

          <div style={styles.filterContainer}>
            <label style={styles.label}>Filtrar por Turma:</label>
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="">Todas as Turmas</option>
              {classes.map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : students.length === 0 ? (
          <p>Nenhum aluno encontrado</p>
        ) : filteredStudents.length === 0 ? (
          <p>Nenhum aluno encontrado com os filtros selecionados</p>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Nome</th>
                  <th style={styles.th}>Data de Nascimento</th>
                  <th style={styles.th}>Responsável</th>
                  <th style={styles.th}>Turma</th>
                  <th style={styles.th}>Modalidade</th>
                  <th style={styles.th}>Mensalidade (R$)</th>
                  <th style={styles.th}>Taxa de Registro (R$)</th>
                  <th style={styles.th}>Data de Registro</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} style={styles.tr}>
                    <td style={styles.td}>{student.id}</td>
                    <td style={styles.td}>{student.name}</td>
                    <td style={styles.td}>{student.birthdayDate}</td>
                    <td style={styles.td}>{student.responsibleAdult}</td>
                    <td style={styles.td}>{student.className}</td>
                    <td style={styles.td}>{student.modality}</td>
                    <td style={styles.td}>
                      R$ {parseFloat(student.monthlyPayment).toFixed(2)}
                    </td>
                    <td style={styles.td}>
                      R$ {parseFloat(student.registrationFee).toFixed(2)}
                    </td>
                    <td style={styles.td}>{student.registrationDate}</td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.statusBadge,
                          backgroundColor:
                            student.status === "ACTIVE" ? "#28a745" : "#dc3545",
                        }}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      {/* Mostrar ações apenas se o aluno está ATIVO */}
                      {student.status === "ACTIVE" ? (
                        <div style={styles.menuContainer}>
                          <button
                            style={styles.menuBtn}
                            onClick={() => toggleMenu(student.id)}
                            disabled={deleting === student.id}
                          >
                            ⋯
                          </button>

                          {openMenu === student.id && (
                            <div style={styles.dropdown}>
                              <button
                                style={styles.updateOption}
                                onClick={() => handleUpdate(student)}
                                disabled={deleting === student.id}
                              >
                                ✏️ Atualizar
                              </button>
                              <button
                                style={styles.deleteOption}
                                onClick={() => handleDelete(student.id)}
                                disabled={deleting === student.id}
                              >
                                {deleting === student.id
                                  ? "Deletando..."
                                  : "🗑️ Deletar"}
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <span style={styles.noActions}>Sem ações</span>
                      )}
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
    maxWidth: "1400px",
    margin: "0 auto",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  filtersContainer: {
    marginBottom: "20px",
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  filterContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  label: {
    fontWeight: "500",
    color: "#333",
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
    background: "#007bff",
    color: "white",
    textAlign: "left",
    fontWeight: "bold",
    borderBottom: "2px solid #0056b3",
  },
  tr: {
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "10px 12px",
  },
  statusBadge: {
    padding: "5px 10px",
    borderRadius: "4px",
    color: "white",
    fontSize: "12px",
    fontWeight: "bold",
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
    color: "#007bff",
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
  noActions: {
    color: "#999",
    fontSize: "12px",
    fontStyle: "italic",
  },
};

export default TableStudents;