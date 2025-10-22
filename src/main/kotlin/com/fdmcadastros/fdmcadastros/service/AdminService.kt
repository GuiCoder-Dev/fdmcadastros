package com.fdmcadastros.fdmcadastros.service

import com.fdmcadastros.fdmcadastros.model.AdminModel
import com.fdmcadastros.fdmcadastros.repository.AdminRepository
import org.springframework.stereotype.Service

@Service
class AdminService(
    private val adminRepository: AdminRepository
) {

    fun create(admin: AdminModel){
        adminRepository.save(admin)
    }
}

// Criar get (listar admin)
// Criar update (modificar admin)