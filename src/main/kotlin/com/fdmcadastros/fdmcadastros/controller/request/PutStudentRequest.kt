package com.fdmcadastros.fdmcadastros.controller.request

import com.fasterxml.jackson.annotation.JsonAlias
import com.fdmcadastros.fdmcadastros.enums.student.ClassName
import com.fdmcadastros.fdmcadastros.enums.student.Modality
import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.NotNull
import java.math.BigDecimal

data class PutStudentRequest(

    @field: NotEmpty(message = "studentName cannot be empty")
    var name: String? = null,

    @field: NotEmpty(message = "responsibleAdult cannot be empty")
    @JsonAlias("responsible_adult")
    var responsibleAdult: String? = null,

    @field: NotNull(message = "monthlyPayment cannot be null")
    @JsonAlias("monthly_payment")
    var monthlyPayment: BigDecimal? = null,

    @field: NotNull(message = "className cannot be null")
    @JsonAlias("class_name")
    var className: ClassName? = null,

    @field: NotNull(message = "modality cannot be null")
    var modality: Modality? = null,
)
