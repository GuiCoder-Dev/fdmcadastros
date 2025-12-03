package com.fdmcadastros.fdmcadastros.controller.request

import com.fasterxml.jackson.annotation.JsonAlias
import jakarta.validation.constraints.Future
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.PastOrPresent
import java.math.BigDecimal
import java.time.LocalDate

data class PostPaymentRequest(

    @field: NotNull(message = "studentId cannot be null")
    @JsonAlias("student_id")
    val studentId: Int,

    @field: NotNull(message = "monthlyPayment cannot be null")
    @JsonAlias("monthly_payment")
    val monthlyPayment: BigDecimal,

    @field: NotNull(message = "paymentDate cannot be null")
    @field: PastOrPresent(message = "the paymentDate must be before the current date")
    @JsonAlias("payment_date")
    val paymentDate: LocalDate,
)

