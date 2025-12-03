package com.fdmcadastros.fdmcadastros.controller.request

import com.fasterxml.jackson.annotation.JsonAlias
import com.fdmcadastros.fdmcadastros.enums.student.ClassName
import com.fdmcadastros.fdmcadastros.enums.student.Modality
import jakarta.validation.constraints.Future
import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Past
import jakarta.validation.constraints.PastOrPresent
import java.math.BigDecimal
import java.time.LocalDate

data class PostStudentRequest(

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
    @field: PastOrPresent(message = "the registrationDate must be before the current date")
    @JsonAlias("registration_date")
    var registrationDate: LocalDate,

    // formato (yyyy-mm-dd)
    @field: NotNull(message = "birthdayDate cannot be null")
    @field: PastOrPresent(message = "the birthdayDate must be before the current date")
    @JsonAlias("birthday_date")
    var birthdayDate: LocalDate,

    @field: NotNull(message = "className cannot be null")
    @JsonAlias("class_name")
    var className: ClassName,

    @field: NotNull(message = "modality cannot be null")
    var modality: Modality,
)

