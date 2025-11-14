package com.fdmcadastros.fdmcadastros.repository

import com.fdmcadastros.fdmcadastros.model.AdminModel
import org.springframework.data.jpa.repository.JpaRepository

interface AdminRepository: JpaRepository<AdminModel, Int>{
    fun existsByEmail(email: String): Boolean

    fun findByEmail(email: String): AdminModel?
}



