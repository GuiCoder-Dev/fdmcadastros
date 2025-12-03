import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuthError } from "../hooks/useAuthError";
import AuthErrorAlert from "../components/AuthErrorAlert";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { authError, handleAuthError, clearError } = useAuthError();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      localStorage.removeItem("token");

      const response = await api.post("/login", {
        email,
        password,
      });

      const token = response.headers.authorization?.split(" ")[1];

      if (token) {
        localStorage.setItem("token", token);
        navigate("/dashboard");
      } else {
        handleAuthError({
          response: {
            status: 400,
            data: { message: "Token não recebido do servidor" },
          },
        });
      }
    } catch (err) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleLogin}>
        <h2 style={styles.title}>Login</h2>

        {/* Alerta de erro geral */}
        <AuthErrorAlert error={authError} onClose={clearError} />

        <div style={styles.formGroup}>
          <input
            style={{
              ...styles.input,
              borderColor: authError ? "#dc3545" : "#ccc",
              backgroundColor: authError ? "#fff5f5" : "white",
            }}
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearError();
            }}
            required
            disabled={loading}
          />
        </div>

        <div style={styles.formGroup}>
          <div style={styles.passwordContainer}>
            <input
              style={{
                ...styles.input,
                borderColor: authError ? "#dc3545" : "#ccc",
                backgroundColor: authError ? "#fff5f5" : "white",
              }}
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearError();
              }}
              required
              disabled={loading}
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
          {authError && (
            <span style={styles.errorText}>⚠️ {authError.message}</span>
          )}
        </div>

        <button
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
          type="submit"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        {/* 🔵 Link para registro */}
        <Link to="/create-admin" style={styles.link}>
          Criar novo admin
        </Link>
      </form>
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
    background: "white",
    padding: "32px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    width: "320px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
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
    padding: "12px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
    transition: "border-color 0.2s, background-color 0.2s",
    boxSizing: "border-box",
    width: "100%",
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
  button: {
    marginTop: "20px",
    padding: "12px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "background 0.3s ease",
  },
  link: {
    marginTop: "15px",
    textAlign: "center",
    color: "#007bff",
    textDecoration: "none",
    fontSize: "14px",
  },
};

export default Login;