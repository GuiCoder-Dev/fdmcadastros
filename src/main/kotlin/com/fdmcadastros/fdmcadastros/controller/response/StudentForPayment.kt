package com.fdmcadastros.fdmcadastros.controller.response

import com.fdmcadastros.fdmcadastros.enums.student.Status

data class StudentForPayment(
    var id: Int? = null,
    var name: String,
    var responsibleAdult: String,
    var status: Status
)
