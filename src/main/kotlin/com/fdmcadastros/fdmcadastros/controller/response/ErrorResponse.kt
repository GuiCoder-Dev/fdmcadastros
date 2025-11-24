package com.fdmcadastros.fdmcadastros.controller.response

data class ErrorResponse(
    val message: String,
    val internalCode: String,
    val httpStatusCode: Int,
    val errors: List<FieldErrorResponse>?
)
