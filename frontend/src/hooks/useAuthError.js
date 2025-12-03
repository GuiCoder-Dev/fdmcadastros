import { useState } from "react";

export function useAuthError() {
  const [authError, setAuthError] = useState(null);

  const handleAuthError = (err) => {
    // Limpar erro anterior
    setAuthError(null);

    // Capturar o erro retornado pelo backend
    const errorResponse = err.response?.data;
    const statusCode = err.response?.status;

    if (!errorResponse && !statusCode) {
      setAuthError({
        message: "Erro ao conectar ao servidor",
        code: "CONNECTION_ERROR",
        status: 0,
      });
      return;
    }

    // Se o backend retornou uma mensagem personalizada
    if (errorResponse?.message) {
      setAuthError({
        message: errorResponse.message,
        code: errorResponse.internalCode,
        status: statusCode,
      });
      return;
    }

    // Fallback com mensagens genéricas por status code
    const statusMessages = {
      401: {
        message: "Email ou senha incorretos",
        code: "INVALID_CREDENTIALS",
      },
      403: {
        message: "Acesso negado",
        code: "ACCESS_DENIED",
      },
      404: {
        message: "Servidor não encontrado",
        code: "NOT_FOUND",
      },
      500: {
        message: "Erro no servidor. Tente novamente mais tarde",
        code: "SERVER_ERROR",
      },
    };

    const errorMsg = statusMessages[statusCode] || {
      message: "Erro ao fazer login",
      code: "UNKNOWN_ERROR",
    };

    setAuthError({
      ...errorMsg,
      status: statusCode,
    });
  };

  const clearError = () => setAuthError(null);

  return { authError, handleAuthError, clearError };
}