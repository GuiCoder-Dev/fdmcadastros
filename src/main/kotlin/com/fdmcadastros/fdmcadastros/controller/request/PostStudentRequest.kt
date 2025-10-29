package com.fdmcadastros.fdmcadastros.controller.request

import com.fasterxml.jackson.annotation.JsonAlias
import com.fdmcadastros.fdmcadastros.enums.student.ClassName
import com.fdmcadastros.fdmcadastros.enums.student.Modality
import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Past
import java.math.BigDecimal
import java.time.LocalDate

data class PostStudentRequest(

    @JsonAlias("admin_id")
    var adminId: Int,

    @field: NotEmpty(message = "studentName cannot be empty")
    var name: String,

    @field: NotEmpty(message = "responsibleAdult cannot be empty")
    @JsonAlias("responsible_adult")
    var responsibleAdult: String,

    @field: NotNull(message = "monthlyPayment cannot be null")
    @JsonAlias("monthly_payment")
    var monthlyPayment: BigDecimal,

    @field: NotNull(message = "registrationFee cannot be null")
    @JsonAlias("registration_fee")
    var registrationFee: BigDecimal,

    // formato (yyyy-mm-dd)
    @field: NotNull(message = "registrationDate cannot be null")
    @JsonAlias("registration_date")
    var registrationDate: LocalDate,

    // formato (yyyy-mm-dd)
    @field: NotNull(message = "birthdayDate cannot be null")
    @field: Past(message = "the birthday date must be after the current date")
    @JsonAlias("birthday_date")
    var birthdayDate: LocalDate,

    @field: NotNull(message = "className cannot be null")
    @JsonAlias("class_name")
    var className: ClassName,

    @field: NotNull(message = "modality cannot be null")
    var modality: Modality,
)

