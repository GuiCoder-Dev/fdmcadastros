package com.fdmcadastros.fdmcadastros.exception

import com.fdmcadastros.fdmcadastros.controller.response.ErrorResponse
import com.fdmcadastros.fdmcadastros.controller.response.FieldErrorResponse
import com.fdmcadastros.fdmcadastros.enuns.error.Errors
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.http.converter.HttpMessageNotReadableException
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException
import java.security.SignatureException

@RestControllerAdvice
class ControllerAdvice {

    // Id not found
    @ExceptionHandler(NotFoundIdException::class)
    fun handleNotFoundIdException(ex: NotFoundIdException): ResponseEntity<ErrorResponse> {
        val error = ErrorResponse(
            message = ex.message,
            internalCode = ex.errorCode,
            httpStatusCode = HttpStatus.NOT_FOUND.value(),
            errors = null
        )
        return ResponseEntity(error, HttpStatus.NOT_FOUND)
    }

    // Do not update status INACTIVE
    @ExceptionHandler( NotImplementedError::class)
    fun handleNotImplementedError(): ResponseEntity<ErrorResponse> {
        val error = ErrorResponse(
            message = Errors.FDM201.message,
            internalCode = Errors.FDM201.code,
            httpStatusCode = HttpStatus.UNPROCESSABLE_ENTITY.value(),
            errors = null
        )
        return ResponseEntity(error, HttpStatus.UNPROCESSABLE_ENTITY)
    }

    // Query does not exist
    @ExceptionHandler(MethodArgumentTypeMismatchException::class)
    fun handleMethodArgumentTypeMismatchException(): ResponseEntity<ErrorResponse> {
        val error = ErrorResponse(
            message = Errors.FDM301.message,
            internalCode = Errors.FDM301.code,
            httpStatusCode = HttpStatus.BAD_REQUEST.value(),
            errors = null
        )
        return ResponseEntity(error, HttpStatus.BAD_REQUEST)
    }


    // E-mail Error
    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleMethodArgumentNotValidException(
        ex: MethodArgumentNotValidException
    ): ResponseEntity<ErrorResponse> {
        val bindingResult = ex.bindingResult
        val fieldErrors = bindingResult.fieldErrors

        val error = when {
            fieldErrors.any { it.code?.contains("EmailUnique", ignoreCase = true) == true } -> {
                ErrorResponse(
                    message = Errors.FDM401.message,
                    internalCode = Errors.FDM401.code,
                    httpStatusCode = HttpStatus.BAD_REQUEST.value(),
                    errors = bindingResult.fieldErrors.map { FieldErrorResponse( it.field, message = null) }
                )
            }
            fieldErrors.any { it.code?.contains("EmailAvaliable", ignoreCase = true) == true } -> {
                ErrorResponse(
                    message = Errors.FDM402.message,
                    internalCode = Errors.FDM402.code,
                    httpStatusCode = HttpStatus.BAD_REQUEST.value(),
                    errors = bindingResult.fieldErrors.map { FieldErrorResponse(it.field, message = null) }
                )
            }
            else -> {
                ErrorResponse(
                    message = "***",
                    internalCode = "***",
                    httpStatusCode = HttpStatus.BAD_REQUEST.value(),
                    errors = null
                )
            }
        }

        return ResponseEntity(error, HttpStatus.valueOf(error.httpStatusCode))
    }


    @ExceptionHandler(SignatureException::class)
    fun handleSignatureException(): ResponseEntity<ErrorResponse> {
        val error = ErrorResponse(
            message = Errors.FDM601.message,
            internalCode = Errors.FDM601.code,
            httpStatusCode = HttpStatus.FORBIDDEN.value(),
            errors = null
        )
        return ResponseEntity(error, HttpStatus.FORBIDDEN)
    }


    //Request inválida
    @ExceptionHandler(HttpMessageNotReadableException::class)
    fun httpMessageNotReadableException(ex: HttpMessageNotReadableException): ResponseEntity<ErrorResponse> {

        val root = ex.cause

        var fieldName = "unknown"
        var causeMessage = root?.message ?: ex.message ?: "Invalid request"

        if (root is com.fasterxml.jackson.databind.exc.InvalidFormatException) {
            fieldName = root.path.lastOrNull()?.fieldName ?: "unknown"
            causeMessage = root.originalMessage
        } else if (root is com.fasterxml.jackson.databind.JsonMappingException) {
            fieldName = root.path.lastOrNull()?.fieldName ?: "unknown"
        }

        val error = ErrorResponse(
            message = Errors.FDM701.message,
            internalCode = Errors.FDM701.code,
            httpStatusCode = HttpStatus.BAD_REQUEST.value(),
            errors = listOf(FieldErrorResponse(field = fieldName, message = causeMessage))

        )

        return ResponseEntity(error, HttpStatus.BAD_REQUEST)
    }

}