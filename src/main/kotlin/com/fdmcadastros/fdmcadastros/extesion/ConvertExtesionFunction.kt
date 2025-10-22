package com.fdmcadastros.fdmcadastros.extesion

import com.fdmcadastros.fdmcadastros.controller.request.PostAdminRequest
import com.fdmcadastros.fdmcadastros.model.AdminModel

// Request to Model
fun PostAdminRequest.toAdminModel(): AdminModel{
    return AdminModel(
        name = this.name,
        email = this.email,
        password = this.password,
    )
}