import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Payments() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("create");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [students, setStudents] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [loadingPayments, setLoadingPayments] = useState(true);

  // Filtros para atualizar e deletar
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");

  const [formData, setFormData] = useState({
    student_id: "",
    monthly_payment: "",
    payment_date: "",
  });

  const [updateFormData, setUpdateFormData] = useState({
    payment_id: "",
    student_name: "",
    monthly_payment: "",
    payment_date: "",
  });

  const [deleteFormData, setDeleteFormData] = useState({
    payment_id: "",
    student_name: "",
    monthly_payment: "",
    payment_date: "",
  });

  // Carregar lista de alunos
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/");
          return;
        }

        const response = await api.get("/students/lists/actives?page=0&size=1000000", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStudents(response.data.content || []);
      } catch (err) {
        console.log("Erro ao carregar alunos:", err.response?.data);
        setError("Erro ao carregar lista de alunos");
      } finally {
        setLoadingStudents(false);
      }
    };

    fetchStudents();
  }, [navigate]);

  // Carregar lista de pagamentos
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/");
          return;
        }

        const response = await api.get("/payments/lists/actives?page=0&size=10000000", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPayments(response.data.content || response.data || []);
      } catch (err) {
        console.log("Erro ao carregar pagamentos:", err.response?.data);
      } finally {
        setLoadingPayments(false);
      }
    };

    fetchPayments();
  }, [navigate]);

  // Função para filtrar pagamentos por mês e ano
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

  // CRIAR PAGAMENTO
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      const payload = {
        student_id: parseInt(formData.student_id),
        monthly_payment: parseFloat(formData.monthly_payment),
        payment_date: formData.payment_date,
      };

      await api.post("/payments/effects", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Pagamento registrado com sucesso!");
      setFormData({
        student_id: "",
        monthly_payment: "",
        payment_date: "",
      });

      // Recarregar pagamentos
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log("Erro:", err.response?.data);
      setError(
        err.response?.data?.message ||
          "Erro ao registrar pagamento. Verifique os dados."
      );
    } finally {
      setLoading(false);
    }
  };

  // ATUALIZAR PAGAMENTO
  const handleSelectPaymentForUpdate = (e) => {
    const paymentId = e.target.value;
    const payment = payments.find((p) => p.id === parseInt(paymentId));

    if (payment) {
      setUpdateFormData({
        payment_id: paymentId,
        student_name: payment.student?.name || "N/A",
        monthly_payment: payment.monthlyPayment,
        payment_date: payment.paymentDate,
      });
    }
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      const payload = {
        monthly_payment: parseFloat(updateFormData.monthly_payment),
        payment_date: updateFormData.payment_date,
      };

      await api.put(`/payments/update/${updateFormData.payment_id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Pagamento atualizado com sucesso!");
      
      setTimeout(() => {
        setUpdateFormData({
          payment_id: "",
          student_name: "",
          monthly_payment: "",
          payment_date: "",
        });
        setSuccess("");
      }, 2000);

    } catch (err) {
      console.log("Erro:", err.response?.data);
      setError(err.response?.data?.message || "Erro ao atualizar pagamento");
    } finally {
      setLoading(false);
    }
  };

  // DELETAR PAGAMENTO
  const handleSelectPaymentForDelete = (e) => {
    const paymentId = e.target.value;
    const payment = payments.find((p) => p.id === parseInt(paymentId));

    if (payment) {
      setDeleteFormData({
        payment_id: paymentId,
        student_name: payment.student?.name || "N/A",
        monthly_payment: payment.monthlyPayment,
        payment_date: payment.paymentDate,
      });
    }
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();

    if (
      !window.confirm(
        `Tem certeza que deseja deletar o pagamento do aluno ${deleteFormData.student_name}?`
      )
    ) {
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      await api.delete(`/payments/delete/${deleteFormData.payment_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Pagamento deletado com sucesso!");
      setDeleteFormData({
        payment_id: "",
        student_name: "",
        monthly_payment: "",
        payment_date: "",
      });

      // Recarregar pagamentos
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log("Erro:", err.response?.data);
      setError(err.response?.data?.message || "Erro ao deletar pagamento");
    } finally {
      setLoading(false);
    }
  };

  const filteredPayments = getFilteredPayments();
  const availableYears = getAvailableYears();

  return (
    <div style={styles.container}>
      <button style={styles.backBtn} onClick={() => navigate("/dashboard")}>
        ← Voltar
      </button>

      <div style={styles.tabsContainer}>
        <button
          style={{
            ...styles.tabBtn,
            background: activeTab === "create" ? "#007bff" : "#6c757d",
          }}
          onClick={() => setActiveTab("create")}
        >
          💰 Efetuar Pagamento
        </button>
        <button
          style={{
            ...styles.tabBtn,
            background: activeTab === "update" ? "#007bff" : "#6c757d",
          }}
          onClick={() => setActiveTab("update")}
        >
          ✏️ Atualizar Pagamento
        </button>
        <button
          style={{
            ...styles.tabBtn,
            background: activeTab === "delete" ? "#007bff" : "#6c757d",
          }}
          onClick={() => setActiveTab("delete")}
        >
          🗑️ Deletar Pagamento
        </button>
      </div>

      {/* EFETUAR PAGAMENTO */}
      {activeTab === "create" && (
        <div style={styles.card}>
          <h2>Efetuar Pagamento</h2>

          {loadingStudents ? (
            <p>Carregando alunos...</p>
          ) : (
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Selecione o Aluno</label>
                <select
                  name="student_id"
                  value={formData.student_id}
                  onChange={handleChange}
                  required
                  style={styles.input}
                >
                  <option value="">-- Selecione um aluno --</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Valor do Pagamento (R$)</label>
                <input
                  type="number"
                  name="monthly_payment"
                  value={formData.monthly_payment}
                  onChange={handleChange}
                  required
                  step="0.01"
                  min="0"
                  style={styles.input}
                  placeholder="250.00"
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Data do Pagamento</label>
                <input
                  type="date"
                  name="payment_date"
                  value={formData.payment_date}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>

              {error && <p style={styles.error}>{error}</p>}
              {success && <p style={styles.success}>{success}</p>}

              <button
                type="submit"
                disabled={loading || students.length === 0}
                style={{
                  ...styles.submitBtn,
                  opacity: loading || students.length === 0 ? 0.7 : 1,
                  cursor:
                    loading || students.length === 0 ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Registrando..." : "Registrar Pagamento"}
              </button>
            </form>
          )}
        </div>
      )}

      {/* ATUALIZAR PAGAMENTO */}
      {activeTab === "update" && (
        <div style={styles.card}>
          <h2>Atualizar Pagamento</h2>

          {loadingPayments ? (
            <p>Carregando pagamentos...</p>
          ) : payments.length === 0 ? (
            <p>Nenhum pagamento encontrado</p>
          ) : (
            <form onSubmit={handleUpdateSubmit} style={styles.form}>
              {/* Filtros */}
              <div style={styles.filterSection}>
                <h3 style={styles.filterTitle}>Filtrar Pagamentos</h3>
                
                <div style={styles.row}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Mês</label>
                    <select
                      value={filterMonth}
                      onChange={(e) => setFilterMonth(e.target.value)}
                      style={styles.input}
                    >
                      <option value="">-- Todos os meses --</option>
                      {months.map((month) => (
                        <option key={month.value} value={month.value}>
                          {month.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Ano</label>
                    <select
                      value={filterYear}
                      onChange={(e) => setFilterYear(e.target.value)}
                      style={styles.input}
                    >
                      <option value="">-- Todos os anos --</option>
                      {availableYears.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Selecione o Pagamento</label>
                <select
                  value={updateFormData.payment_id}
                  onChange={handleSelectPaymentForUpdate}
                  required
                  style={styles.input}
                >
                  <option value="">
                    -- Selecione um pagamento ({filteredPayments.length}) --
                  </option>
                  {filteredPayments.map((payment) => (
                    <option key={payment.id} value={payment.id}>
                      {payment.student?.name} - R${" "}
                      {parseFloat(payment.monthlyPayment).toFixed(2)} -{" "}
                      {payment.paymentDate}
                    </option>
                  ))}
                </select>
              </div>

              {updateFormData.payment_id && (
                <>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Aluno</label>
                    <input
                      type="text"
                      value={updateFormData.student_name}
                      disabled
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Valor do Pagamento (R$)</label>
                    <input
                      type="number"
                      name="monthly_payment"
                      value={updateFormData.monthly_payment}
                      onChange={handleUpdateChange}
                      required
                      step="0.01"
                      min="0"
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Data do Pagamento</label>
                    <input
                      type="date"
                      name="payment_date"
                      value={updateFormData.payment_date}
                      onChange={handleUpdateChange}
                      required
                      style={styles.input}
                    />
                  </div>

                  {error && (
                    <div style={styles.errorAlert}>
                      <span>❌ {error}</span>
                      <button
                        onClick={() => setError("")}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#dc3545",
                          cursor: "pointer",
                          fontSize: "20px",
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                  
                  {success && (
                    <div style={styles.successAlert}>
                      <span>✅ {success}</span>
                      <button
                        onClick={() => setSuccess("")}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#155724",
                          cursor: "pointer",
                          fontSize: "20px",
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      ...styles.submitBtn,
                      background: "#28a745",
                      opacity: loading ? 0.7 : 1,
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                  >
                    {loading ? "Atualizando..." : "Atualizar Pagamento"}
                  </button>
                </>
              )}
            </form>
          )}
        </div>
      )}

      {/* DELETAR PAGAMENTO */}
      {activeTab === "delete" && (
        <div style={styles.card}>
          <h2>Deletar Pagamento</h2>

          {loadingPayments ? (
            <p>Carregando pagamentos...</p>
          ) : payments.length === 0 ? (
            <p>Nenhum pagamento encontrado</p>
          ) : (
            <form onSubmit={handleDeleteSubmit} style={styles.form}>
              {/* Filtros */}
              <div style={styles.filterSection}>
                <h3 style={styles.filterTitle}>Filtrar Pagamentos</h3>
                
                <div style={styles.row}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Mês</label>
                    <select
                      value={filterMonth}
                      onChange={(e) => setFilterMonth(e.target.value)}
                      style={styles.input}
                    >
                      <option value="">-- Todos os meses --</option>
                      {months.map((month) => (
                        <option key={month.value} value={month.value}>
                          {month.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Ano</label>
                    <select
                      value={filterYear}
                      onChange={(e) => setFilterYear(e.target.value)}
                      style={styles.input}
                    >
                      <option value="">-- Todos os anos --</option>
                      {availableYears.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Selecione o Pagamento</label>
                <select
                  value={deleteFormData.payment_id}
                  onChange={handleSelectPaymentForDelete}
                  required
                  style={styles.input}
                >
                  <option value="">
                    -- Selecione um pagamento ({filteredPayments.length}) --
                  </option>
                  {filteredPayments.map((payment) => (
                    <option key={payment.id} value={payment.id}>
                      {payment.student?.name} - R${" "}
                      {parseFloat(payment.monthlyPayment).toFixed(2)} -{" "}
                      {payment.paymentDate}
                    </option>
                  ))}
                </select>
              </div>

              {deleteFormData.payment_id && (
                <>
                  <div style={styles.infoContainer}>
                    <div style={styles.infoRow}>
                      <label style={styles.label}>Aluno:</label>
                      <span style={styles.infoValue}>
                        {deleteFormData.student_name}
                      </span>
                    </div>
                    <div style={styles.infoRow}>
                      <label style={styles.label}>Valor:</label>
                      <span style={styles.infoValue}>
                        R$ {parseFloat(deleteFormData.monthly_payment).toFixed(2)}
                      </span>
                    </div>
                    <div style={styles.infoRow}>
                      <label style={styles.label}>Data:</label>
                      <span style={styles.infoValue}>
                        {deleteFormData.payment_date}
                      </span>
                    </div>
                  </div>

                  <div style={styles.warningBox}>
                    ⚠️ Esta ação não pode ser desfeita. Deseja continuar?
                  </div>

                  {error && <p style={styles.error}>{error}</p>}
                  {success && <p style={styles.success}>{success}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      ...styles.submitBtn,
                      background: "#dc3545",
                      opacity: loading ? 0.7 : 1,
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                  >
                    {loading ? "Deletando..." : "🗑️ Deletar Pagamento"}
                  </button>
                </>
              )}
            </form>
          )}
        </div>
      )}
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
  tabsContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  tabBtn: {
    padding: "10px 20px",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "all 0.3s ease",
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "8px",
    maxWidth: "600px",
    margin: "0 auto",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  form: {
    marginTop: "20px",
  },
  filterSection: {
    background: "#f0f8ff",
    padding: "15px",
    borderRadius: "6px",
    marginBottom: "20px",
    border: "1px solid #b3d9ff",
  },
  filterTitle: {
    margin: "0 0 15px 0",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#0066cc",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "500",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  submitBtn: {
    width: "100%",
    padding: "12px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "20px",
  },
  error: {
    color: "#dc3545",
    marginTop: "10px",
    padding: "10px",
    background: "#f8d7da",
    borderRadius: "4px",
  },
  errorAlert: {
    padding: "12px 15px",
    background: "#f8d7da",
    color: "#dc3545",
    borderRadius: "4px",
    border: "1px solid #f5c6cb",
    marginBottom: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "14px",
  },
  success: {
    color: "#155724",
    marginTop: "10px",
    padding: "10px",
    background: "#d4edda",
    borderRadius: "4px",
  },
  successAlert: {
    padding: "12px 15px",
    background: "#d4edda",
    color: "#155724",
    borderRadius: "4px",
    border: "1px solid #c3e6cb",
    marginBottom: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "14px",
  },
  infoContainer: {
    background: "#f9f9f9",
    padding: "15px",
    borderRadius: "4px",
    marginTop: "20px",
    marginBottom: "20px",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    fontSize: "14px",
  },
  infoValue: {
    fontWeight: "bold",
    color: "#333",
  },
  warningBox: {
    background: "#fff3cd",
    color: "#856404",
    padding: "12px",
    borderRadius: "4px",
    marginTop: "15px",
    marginBottom: "15px",
    border: "1px solid #ffeaa7",
  },
};

export default Payments;