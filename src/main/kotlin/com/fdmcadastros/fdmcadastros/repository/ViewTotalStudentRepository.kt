package com.fdmcadastros.fdmcadastros.repository

import com.fdmcadastros.fdmcadastros.model.ViewTotalStudentModel
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository

interface ViewTotalStudentRepository: JpaRepository<ViewTotalStudentModel, Int> {

    fun findByStudentId(id: Int?, pageable: Pageable): Page<ViewTotalStudentModel>
}