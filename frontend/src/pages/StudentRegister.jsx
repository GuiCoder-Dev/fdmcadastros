import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useFormError } from "../hooks/useFormError";
import FormErrorAlert from "../components/FormErrorAlert";

function StudentRegister() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("register");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const { formErrors, generalError, handleFormError, clearError } = useFormError();

  const [formData, setFormData] = useState({
    name: "",
    responsible_adult: "",
    monthly_payment: "",
    registration_fee: "",
    registration_date: "",
    birthday_date: "",
    class_name: "",
    modality: "",
  });

  const [updateFormData, setUpdateFormData] = useState({
    student_id: "",
    name: "",
    responsible_adult: "",
    monthly_payment: "",
    class_name: "",
    modality: "",
  });

  const [deleteFormData, setDeleteFormData] = useState({
    student_id: "",
    name: "",
    responsible_adult: "",
    monthly_payment: "",
    class_name: "",
    modality: "",
  });

  // Carregar lista de alunos ao abrir a página
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/");
          return;
        }

        const response = await api.get("/students/lists/actives?page=0&size=10000", {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    clearError(name);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    clearError(name);
  };

  const handleDeleteChange = (e) => {
    const { name, value } = e.target;
    setDeleteFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectStudent = (e) => {
    const studentId = e.target.value;
    setUpdateFormData((prev) => ({
      ...prev,
      student_id: studentId,
    }));

    // Preencher campos com dados do aluno
    const student = students.find((s) => s.id === parseInt(studentId));
    if (student) {
      setUpdateFormData({
        student_id: studentId,
        name: student.name,
        responsible_adult: student.responsibleAdult,
        monthly_payment: student.monthlyPayment,
        class_name: student.className,
        modality: student.modality,
      });
    }
  };

  const handleSelectStudentForDelete = (e) => {
    const studentId = e.target.value;
    setDeleteFormData((prev) => ({
      ...prev,
      student_id: studentId,
    }));

    // Preencher campos com dados do aluno
    const student = students.find((s) => s.id === parseInt(studentId));
    if (student) {
      setDeleteFormData({
        student_id: studentId,
        name: student.name,
        responsible_adult: student.responsibleAdult,
        monthly_payment: student.monthlyPayment,
        class_name: student.className,
        modality: student.modality,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      const payload = {
        name: formData.name,
        responsible_adult: formData.responsible_adult,
        monthly_payment: parseFloat(formData.monthly_payment),
        registration_fee: parseFloat(formData.registration_fee),
        registration_date: formData.registration_date,
        birthday_date: formData.birthday_date,
        class_name: formData.class_name,
        modality: formData.modality,
      };

      await api.post("/students/creates", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Aluno cadastrado com sucesso!");
      clearError();
      setFormData({
        name: "",
        responsible_adult: "",
        monthly_payment: "",
        registration_fee: "",
        registration_date: "",
        birthday_date: "",
        class_name: "",
        modality: "",
      });
    } catch (err) {
      console.log("Erro:", err.response?.data);
      handleFormError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      const payload = {
        name: updateFormData.name,
        responsible_adult: updateFormData.responsible_adult,
        monthly_payment: parseFloat(updateFormData.monthly_payment),
        class_name: updateFormData.class_name,
        modality: updateFormData.modality,
      };

      await api.put(`/students/update/${updateFormData.student_id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Aluno atualizado com sucesso!");
      clearError();
      
      setTimeout(() => {
        setUpdateFormData({
          student_id: "",
          name: "",
          responsible_adult: "",
          monthly_payment: "",
          class_name: "",
          modality: "",
        });
      }, 2000);

    } catch (err) {
      console.log("Erro completo:", err);
      handleFormError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();

    if (!window.confirm(`Tem certeza que deseja deletar o aluno ${deleteFormData.name}? Esta ação não pode ser desfeita!`)) {
      return;
    }

    setSuccess("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      await api.delete(`/students/delete/${deleteFormData.student_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Aluno deletado com sucesso!");
      clearError();
      
      // Remove o aluno da lista
      setStudents(students.filter((s) => s.id !== parseInt(deleteFormData.student_id)));

      setTimeout(() => {
        setDeleteFormData({
          student_id: "",
          name: "",
          responsible_adult: "",
          monthly_payment: "",
          class_name: "",
          modality: "",
        });
      }, 2000);

    } catch (err) {
      console.log("Erro:", err.response?.data);
      handleFormError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <button style={styles.backBtn} onClick={() => navigate("/dashboard")}>
        ← Voltar
      </button>

      <div style={styles.tabsContainer}>
        <button
          style={{
            ...styles.tabBtn,
            background: activeTab === "register" ? "#007bff" : "#6c757d",
          }}
          onClick={() => setActiveTab("register")}
        >
          📝 Cadastrar Aluno
        </button>
        <button
          style={{
            ...styles.tabBtn,
            background: activeTab === "update" ? "#007bff" : "#6c757d",
          }}
          onClick={() => setActiveTab("update")}
        >
          ✏️ Atualizar Aluno
        </button>
        <button
          style={{
            ...styles.tabBtn,
            background: activeTab === "delete" ? "#007bff" : "#6c757d",
          }}
          onClick={() => setActiveTab("delete")}
        >
          🗑️ Deletar Aluno
        </button>
      </div>

      {/* CADASTRO */}
      {activeTab === "register" && (
        <div style={styles.card}>
          <h2>Cadastrar Aluno</h2>

          <FormErrorAlert
            generalError={generalError}
            onClose={() => clearError()}
          />

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

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Nome do Aluno</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  ...styles.input,
                  borderColor: formErrors.name ? "#dc3545" : "#ddd",
                  backgroundColor: formErrors.name ? "#fff5f5" : "white",
                }}
                placeholder="João Silva"
              />
              {formErrors.name && (
                <span style={styles.errorText}>⚠️ {formErrors.name}</span>
              )}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Responsável</label>
              <input
                type="text"
                name="responsible_adult"
                value={formData.responsible_adult}
                onChange={handleChange}
                required
                style={{
                  ...styles.input,
                  borderColor: formErrors.responsible_adult ? "#dc3545" : "#ddd",
                  backgroundColor: formErrors.responsible_adult ? "#fff5f5" : "white",
                }}
                placeholder="Maria Silva"
              />
              {formErrors.responsible_adult && (
                <span style={styles.errorText}>⚠️ {formErrors.responsible_adult}</span>
              )}
            </div>

            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Mensalidade (R$)</label>
                <input
                  type="number"
                  name="monthly_payment"
                  value={formData.monthly_payment}
                  onChange={handleChange}
                  required
                  step="0.01"
                  style={{
                    ...styles.input,
                    borderColor: formErrors.monthly_payment ? "#dc3545" : "#ddd",
                    backgroundColor: formErrors.monthly_payment ? "#fff5f5" : "white",
                  }}
                  placeholder="250.00"
                />
                {formErrors.monthly_payment && (
                  <span style={styles.errorText}>⚠️ {formErrors.monthly_payment}</span>
                )}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Taxa de Registro (R$)</label>
                <input
                  type="number"
                  name="registration_fee"
                  value={formData.registration_fee}
                  onChange={handleChange}
                  required
                  step="0.01"
                  style={{
                    ...styles.input,
                    borderColor: formErrors.registration_fee ? "#dc3545" : "#ddd",
                    backgroundColor: formErrors.registration_fee ? "#fff5f5" : "white",
                  }}
                  placeholder="100.00"
                />
                {formErrors.registration_fee && (
                  <span style={styles.errorText}>⚠️ {formErrors.registration_fee}</span>
                )}
              </div>
            </div>

            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Data de Registro</label>
                <input
                  type="date"
                  name="registration_date"
                  value={formData.registration_date}
                  onChange={handleChange}
                  required
                  style={{
                    ...styles.input,
                    borderColor: formErrors.registration_date ? "#dc3545" : "#ddd",
                    backgroundColor: formErrors.registration_date ? "#fff5f5" : "white",
                  }}
                />
                {formErrors.registration_date && (
                  <span style={styles.errorText}>⚠️ {formErrors.registration_date}</span>
                )}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Data de Nascimento</label>
                <input
                  type="date"
                  name="birthday_date"
                  value={formData.birthday_date}
                  onChange={handleChange}
                  required
                  style={{
                    ...styles.input,
                    borderColor: formErrors.birthday_date ? "#dc3545" : "#ddd",
                    backgroundColor: formErrors.birthday_date ? "#fff5f5" : "white",
                  }}
                />
                {formErrors.birthday_date && (
                  <span style={styles.errorText}>⚠️ {formErrors.birthday_date}</span>
                )}
              </div>
            </div>

            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Turma</label>
                <select
                  name="class_name"
                  value={formData.class_name}
                  onChange={handleChange}
                  required
                  style={{
                    ...styles.input,
                    borderColor: formErrors.class_name ? "#dc3545" : "#ddd",
                    backgroundColor: formErrors.class_name ? "#fff5f5" : "white",
                  }}
                >
                  <option value="">Selecione a turma</option>
                  <option value="MONDAY">Segunda</option>
                  <option value="TUESDAY">Terça</option>
                  <option value="WEDNESDAY">Quarta</option>
                  <option value="THURSDAY">Quinta</option>
                  <option value="FRIDAY">Sexta</option>
                  <option value="SATURDAY">Sábado</option>
                </select>
                {formErrors.class_name && (
                  <span style={styles.errorText}>⚠️ {formErrors.class_name}</span>
                )}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Modalidade</label>
                <select
                  name="modality"
                  value={formData.modality}
                  onChange={handleChange}
                  required
                  style={{
                    ...styles.input,
                    borderColor: formErrors.modality ? "#dc3545" : "#ddd",
                    backgroundColor: formErrors.modality ? "#fff5f5" : "white",
                  }}
                >
                  <option value="">Selecione a modalidade</option>
                  <option value="PRESENCIAL">Presencial</option>
                  <option value="ONLINE">Online</option>
                </select>
                {formErrors.modality && (
                  <span style={styles.errorText}>⚠️ {formErrors.modality}</span>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.submitBtn,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Cadastrando..." : "Cadastrar Aluno"}
            </button>
          </form>
        </div>
      )}

      {/* ATUALIZAR */}
      {activeTab === "update" && (
        <div style={styles.card}>
          <h2>Atualizar Aluno</h2>

          <FormErrorAlert
            generalError={generalError}
            onClose={() => clearError()}
          />

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

          {loadingStudents ? (
            <p>Carregando alunos...</p>
          ) : (
            <form onSubmit={handleUpdateSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Selecione o Aluno</label>
                <select
                  name="student_id"
                  value={updateFormData.student_id}
                  onChange={handleSelectStudent}
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

              {updateFormData.student_id && (
                <>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Nome do Aluno</label>
                    <input
                      type="text"
                      name="name"
                      value={updateFormData.name}
                      onChange={handleUpdateChange}
                      required
                      style={{
                        ...styles.input,
                        borderColor: formErrors.name ? "#dc3545" : "#ddd",
                        backgroundColor: formErrors.name ? "#fff5f5" : "white",
                      }}
                    />
                    {formErrors.name && (
                      <span style={styles.errorText}>⚠️ {formErrors.name}</span>
                    )}
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Responsável</label>
                    <input
                      type="text"
                      name="responsible_adult"
                      value={updateFormData.responsible_adult}
                      onChange={handleUpdateChange}
                      required
                      style={{
                        ...styles.input,
                        borderColor: formErrors.responsible_adult ? "#dc3545" : "#ddd",
                        backgroundColor: formErrors.responsible_adult ? "#fff5f5" : "white",
                      }}
                    />
                    {formErrors.responsible_adult && (
                      <span style={styles.errorText}>⚠️ {formErrors.responsible_adult}</span>
                    )}
                  </div>

                  <div style={styles.row}>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Mensalidade (R$)</label>
                      <input
                        type="number"
                        name="monthly_payment"
                        value={updateFormData.monthly_payment}
                        onChange={handleUpdateChange}
                        required
                        step="0.01"
                        style={{
                          ...styles.input,
                          borderColor: formErrors.monthly_payment ? "#dc3545" : "#ddd",
                          backgroundColor: formErrors.monthly_payment ? "#fff5f5" : "white",
                        }}
                      />
                      {formErrors.monthly_payment && (
                        <span style={styles.errorText}>⚠️ {formErrors.monthly_payment}</span>
                      )}
                    </div>

                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Turma</label>
                      <select
                        name="class_name"
                        value={updateFormData.class_name}
                        onChange={handleUpdateChange}
                        required
                        style={{
                          ...styles.input,
                          borderColor: formErrors.class_name ? "#dc3545" : "#ddd",
                          backgroundColor: formErrors.class_name ? "#fff5f5" : "white",
                        }}
                      >
                        <option value="">Selecione a turma</option>
                        <option value="MONDAY">Segunda</option>
                        <option value="TUESDAY">Terça</option>
                        <option value="WEDNESDAY">Quarta</option>
                        <option value="THURSDAY">Quinta</option>
                        <option value="FRIDAY">Sexta</option>
                        <option value="SATURDAY">Sábado</option>
                      </select>
                      {formErrors.class_name && (
                        <span style={styles.errorText}>⚠️ {formErrors.class_name}</span>
                      )}
                    </div>
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Modalidade</label>
                    <select
                      name="modality"
                      value={updateFormData.modality}
                      onChange={handleUpdateChange}
                      required
                      style={{
                        ...styles.input,
                        borderColor: formErrors.modality ? "#dc3545" : "#ddd",
                        backgroundColor: formErrors.modality ? "#fff5f5" : "white",
                      }}
                    >
                      <option value="">Selecione a modalidade</option>
                      <option value="PRESENCIAL">Presencial</option>
                      <option value="ONLINE">Online</option>
                    </select>
                    {formErrors.modality && (
                      <span style={styles.errorText}>⚠️ {formErrors.modality}</span>
                    )}
                  </div>

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
                    {loading ? "Atualizando..." : "Atualizar Aluno"}
                  </button>
                </>
              )}
            </form>
          )}
        </div>
      )}

      {/* DELETAR */}
      {activeTab === "delete" && (
        <div style={styles.card}>
          <h2>Deletar Aluno</h2>

          {loadingStudents ? (
            <p>Carregando alunos...</p>
          ) : (
            <form onSubmit={handleDeleteSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Selecione o Aluno</label>
                <select
                  name="student_id"
                  value={deleteFormData.student_id}
                  onChange={handleSelectStudentForDelete}
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

              {deleteFormData.student_id && (
                <>
                  <div style={styles.infoContainer}>
                    <div style={styles.infoRow}>
                      <label style={styles.label}>Nome:</label>
                      <span style={styles.infoValue}>{deleteFormData.name}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <label style={styles.label}>Responsável:</label>
                      <span style={styles.infoValue}>{deleteFormData.responsible_adult}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <label style={styles.label}>Mensalidade:</label>
                      <span style={styles.infoValue}>
                        R$ {parseFloat(deleteFormData.monthly_payment).toFixed(2)}
                      </span>
                    </div>
                    <div style={styles.infoRow}>
                      <label style={styles.label}>Turma:</label>
                      <span style={styles.infoValue}>{deleteFormData.class_name}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <label style={styles.label}>Modalidade:</label>
                      <span style={styles.infoValue}>{deleteFormData.modality}</span>
                    </div>
                  </div>

                  <div style={styles.warningBox}>
                    ⚠️ Esta ação não pode ser desfeita. Todos os dados do aluno serão deletados permanentemente!
                  </div>

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
                    {loading ? "Deletando..." : "🗑️ Deletar Aluno"}
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
    transition: "border-color 0.2s, background-color 0.2s",
  },
  errorText: {
    color: "#dc3545",
    fontSize: "12px",
    fontWeight: "500",
    marginTop: "2px",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
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
    border: "1px solid #e9ecef",
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
    fontSize: "14px",
  },
};

export default StudentRegister;