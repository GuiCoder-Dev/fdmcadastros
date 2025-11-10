package com.fdmcadastros.fdmcadastros.model

import jakarta.persistence.*
import java.math.BigDecimal
import java.time.LocalDate

@Entity(name = "payment")
data class PaymentModel(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null,

    @ManyToOne
    @JoinColumn(name = "student_id")
    var student: StudentModel,

    @Column(name = "monthly_payment")
    var monthlyPayment: BigDecimal,

    @Column(name = "payment_date")
    var paymentDate: LocalDate,

    )
