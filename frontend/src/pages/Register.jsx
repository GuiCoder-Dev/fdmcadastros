import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import { useFormError } from "../hooks/useFormError";
import FormErrorAlert from "../components/FormErrorAlert";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { formErrors, generalError, handleFormError, clearError } = useFormError();

  const handleInputChange = (field, value) => {
    if (field === "name") setName(value);
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
    
    // Limpar erro do campo quando o usuário começar a digitar
    clearError(field);
    setSuccess("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      await api.post("/admin/creates", {
        name,
        email,
        password,
      });

      setSuccess("Admin criado com sucesso!");
      clearError();

      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.log("Erro completo:", err.response?.data);
      handleFormError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ marginBottom: "20px" }}>Criar Admin</h2>

        {/* Alerta de erro geral */}
        <FormErrorAlert
          generalError={generalError}
          onClose={() => clearError()}
        />

        {/* Alerta de sucesso */}
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

        <form onSubmit={handleRegister}>
          <div style={styles.formGroup}>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => handleInputChange("name", e.target.value)}
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

          <div style={styles.formGroup}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              style={{
                ...styles.input,
                borderColor: formErrors.email ? "#dc3545" : "#ddd",
                backgroundColor: formErrors.email ? "#fff5f5" : "white",
              }}
            />
            {formErrors.email && (
              <span style={styles.errorText}>⚠️ {formErrors.email}</span>
            )}
          </div>

          <div style={styles.formGroup}>
            <div style={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
                style={{
                  ...styles.input,
                  borderColor: formErrors.password ? "#dc3545" : "#ddd",
                  backgroundColor: formErrors.password ? "#fff5f5" : "white",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
                disabled={loading}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {formErrors.password && (
              <span style={styles.errorText}>⚠️ {formErrors.password}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Criando..." : "Criar Admin"}
          </button>
        </form>

        {/* 🔵 Link para login */}
        <Link to="/" style={styles.link}>
          Já tem conta? Fazer login
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f0f0f0",
  },
  card: {
    width: "400px",
    padding: "30px",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "0 0 12px #ccc",
  },
  formGroup: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  passwordContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px",
    transition: "border-color 0.2s, background-color 0.2s",
    boxSizing: "border-box",
  },
  eyeButton: {
    position: "absolute",
    right: "10px",
    background: "transparent",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    padding: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "#dc3545",
    fontSize: "12px",
    fontWeight: "500",
    marginTop: "2px",
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
  button: {
    width: "100%",
    padding: "10px",
    background: "#0066ff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    marginTop: "10px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "background 0.3s ease",
  },
  link: {
    display: "block",
    marginTop: "15px",
    textAlign: "center",
    color: "#0066ff",
    textDecoration: "none",
  },
};