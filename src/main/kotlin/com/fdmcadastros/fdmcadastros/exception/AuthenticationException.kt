package com.fdmcadastros.fdmcadastros.exception

class AuthenticationException(
    override val message: String,
    val errorCode: String,
): RuntimeException()
