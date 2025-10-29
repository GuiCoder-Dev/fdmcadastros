package com.fdmcadastros.fdmcadastros.repository

import com.fdmcadastros.fdmcadastros.enums.student.ClassName
import com.fdmcadastros.fdmcadastros.enums.student.Status
import com.fdmcadastros.fdmcadastros.model.StudentModel
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository

interface StudentRepository: JpaRepository<StudentModel, Int> {

    fun findByStatus(status: Status, pageable: Pageable): Page<StudentModel>

    fun findByClassName(className: ClassName?, pageable: Pageable): Page<StudentModel>
}