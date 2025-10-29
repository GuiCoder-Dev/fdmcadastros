package com.fdmcadastros.fdmcadastros.model

import com.fdmcadastros.fdmcadastros.enums.student.ClassName
import com.fdmcadastros.fdmcadastros.enums.student.Modality
import com.fdmcadastros.fdmcadastros.enums.student.Status
import jakarta.persistence.*
import java.math.BigDecimal
import java.time.LocalDate

@Entity (name = "student")
data class StudentModel(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null,

    @ManyToOne
    @JoinColumn(name = "admin_id")
    var admin: AdminModel,

    @Column(name = "student_name")
    var name: String,

    @Column(name = "responsible_adult")
    var responsibleAdult: String,

    @Column(name = "monthly_payment")
    var monthlyPayment: BigDecimal,

    @Column(name = "registration_fee")
    var registrationFee: BigDecimal,

    @Column(name = "registration_date")
    var registrationDate: LocalDate,

    @Column(name = "birthday_date")
    var birthdayDate: LocalDate,

    @Column(name = "class_name")
    @Enumerated(EnumType.STRING)
    var className: ClassName,

    @Column(name = "modality")
    @Enumerated(EnumType.STRING)
    var modality: Modality,

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    var status: Status
)