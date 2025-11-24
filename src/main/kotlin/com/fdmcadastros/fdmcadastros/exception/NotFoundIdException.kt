package com.fdmcadastros.fdmcadastros.exception

class NotFoundIdException(
    override val message: String,
    val errorCode: String,
): RuntimeException()


