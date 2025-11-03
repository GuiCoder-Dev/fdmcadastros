package com.fdmcadastros.fdmcadastros.model

import com.fdmcadastros.fdmcadastros.enums.student.Status
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
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
