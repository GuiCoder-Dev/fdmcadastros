package com.fdmcadastros.fdmcadastros.controller.request

import com.fdmcadastros.fdmcadastros.validation.EmailAvaliable
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotEmpty

data class PostAdminRequest(

    @field: NotEmpty(message = "Name cannot be empty")
    var name: String,

    // Fazer verificação melhor
    @field: Email(message = "Email must be valid")
    @EmailAvaliable
    var email: String,

    @field: NotEmpty(message = "Password cannot be empty")
    var password: String

)
