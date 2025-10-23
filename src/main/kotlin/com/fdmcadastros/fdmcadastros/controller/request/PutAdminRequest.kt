package com.fdmcadastros.fdmcadastros.controller.request

import com.fdmcadastros.fdmcadastros.validation.domain.EmailAvaliable
import com.fdmcadastros.fdmcadastros.validation.unique.EmailUnique
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotEmpty

data class PutAdminRequest(

    @field: NotEmpty(message = "Name cannot be empty")
    var name: String?,

    @field: Email(message = "Email must be valid")
    @EmailAvaliable
    @EmailUnique
    var email: String?,
)
