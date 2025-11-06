package com.fdmcadastros.fdmcadastros.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import org.hibernate.annotations.Immutable
import java.math.BigDecimal

@Entity
@Immutable
@Table(name = "view_total_value_per_student")
data class ViewTotalStudentModel(
    @Id
    val studentId: Int,

    @Column(name = "student_name")
    val studentName: String,

    @Column(name = "registration_fee")
    val registrationFee: BigDecimal,

    @Column(name = "total_monthly_payments")
    val totalMonthlyPayments: BigDecimal,

    @Column(name = "total_paid")
    val totalPaid: BigDecimal,
)
