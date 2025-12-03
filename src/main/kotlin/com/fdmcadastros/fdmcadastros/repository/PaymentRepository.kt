package com.fdmcadastros.fdmcadastros.repository

import com.fdmcadastros.fdmcadastros.enums.student.Status
import com.fdmcadastros.fdmcadastros.model.PaymentModel
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface PaymentRepository: JpaRepository<PaymentModel, Int> {

    // Buscar pagamentos por ID do aluno
    fun findAllByStudentId(studentId: Int?, pageable: Pageable): Page<PaymentModel>

    // Buscar pagamentos de alunos ativos (por ID específico)
    @Query("""
        SELECT p FROM payment p 
        WHERE p.student.id = :studentId 
        AND p.student.status = :status
    """)
    fun findAllByStudentIdAndStatus(
        @Param("studentId") studentId: Int,
        @Param("status") status: Status,
        pageable: Pageable
    ): Page<PaymentModel>

    // Buscar todos os pagamentos de alunos ativos
    @Query("""
        SELECT p FROM payment p 
        WHERE p.student.status = :status
    """)
    fun findStudentByStudentStatus(
        @Param("status") status: Status,
        pageable: Pageable
    ): Page<PaymentModel>
}