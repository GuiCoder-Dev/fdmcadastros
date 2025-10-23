package com.fdmcadastros.fdmcadastros.extesion

import com.fdmcadastros.fdmcadastros.controller.request.PostAdminRequest
import com.fdmcadastros.fdmcadastros.controller.request.PutAdminRequest
import com.fdmcadastros.fdmcadastros.model.AdminModel

// Request to Model
fun PostAdminRequest.toAdminModel(): AdminModel{
    return AdminModel(
        name = this.name,
        email = this.email,
        password = this.password,
    )
}

// Request to Model
fun PutAdminRequest.toAdminModel(previousValue: AdminModel): AdminModel {
    return AdminModel(
        id = previousValue.id,
        name = this.name ?: previousValue.name,
        email = this.email ?: previousValue.email,
        password = previousValue.password
    )
}