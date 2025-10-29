package com.fdmcadastros.fdmcadastros.controller.response

import com.fdmcadastros.fdmcadastros.enums.student.ClassName
import com.fdmcadastros.fdmcadastros.enums.student.Modality
import com.fdmcadastros.fdmcadastros.enums.student.Status
import java.math.BigDecimal
import java.time.LocalDate

data class StudentAllResponse(

    var id: Int? = null,
    var admin: AdminForStudent,
    var name: String,
    var responsibleAdult: String,
    var monthlyPayment: BigDecimal,
    var registrationFee: BigDecimal,
    var registrationDate: LocalDate,
    var birthdayDate: LocalDate,
    var className: ClassName,
    var modality: Modality,
    var status: Status

)

