import { useState } from "react";

export function useFormError() {
  const [formErrors, setFormErrors] = useState({});
  const [generalError, setGeneralError] = useState(null);

  const handleFormError = (err) => {
    // Limpar erros anteriores
    setFormErrors({});
    setGeneralError(null);

    // Seu backend retorna ErrorResponse com essa estrutura
    const errorResponse = err.response?.data;

    if (!errorResponse) {
      setGeneralError({
        message: err.message || "Erro desconhecido",
        code: "UNKNOWN",
      });
      return;
    }

    // Se tem erros de campo, mapear para o formulário
    if (errorResponse.errors && Array.isArray(errorResponse.errors)) {
      const fieldErrorMap = {};
      errorResponse.errors.forEach((fieldError) => {
        fieldErrorMap[fieldError.field] = errorResponse.message;
      });
      setFormErrors(fieldErrorMap);
    }

    // Se tem erro geral
    if (errorResponse.message) {
      setGeneralError({
        message: errorResponse.message,
        code: errorResponse.internalCode,
        httpStatus: errorResponse.httpStatusCode,
      });
    }
  };

  const clearError = (fieldName) => {
    if (fieldName) {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated[fieldName];
        return updated;
      });
    } else {
      setFormErrors({});
      setGeneralError(null);
    }
  };

  return {
    formErrors,
    generalError,
    handleFormError,
    clearError,
  };
}