package com.fdmcadastros.fdmcadastros.controller.response

import java.math.BigDecimal
import java.time.LocalDate

data class PaymentAllResponse(

    var id: Int? = null,

    var student: StudentForPayment,

    var monthlyPayment: BigDecimal,

    var paymentDate: LocalDate,
)
