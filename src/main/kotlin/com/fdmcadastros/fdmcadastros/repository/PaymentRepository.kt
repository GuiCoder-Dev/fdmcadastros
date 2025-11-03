package com.fdmcadastros.fdmcadastros.repository

import com.fdmcadastros.fdmcadastros.model.PaymentModel
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository

interface PaymentRepository: JpaRepository<PaymentModel, Int> {

    fun findAllByStudentId(studentId: Int?, pageable: Pageable): Page<PaymentModel>

}