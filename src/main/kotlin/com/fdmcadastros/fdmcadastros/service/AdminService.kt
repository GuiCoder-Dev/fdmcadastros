package com.fdmcadastros.fdmcadastros.service

import com.fdmcadastros.fdmcadastros.model.AdminModel
import com.fdmcadastros.fdmcadastros.repository.AdminRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class AdminService(
    private val adminRepository: AdminRepository,
    private val passwordEncoder: PasswordEncoder
) {

    // Post
    fun create(admin: AdminModel){
        val adminWithPasswordCripty =
            admin.copy(
                password = passwordEncoder.encode(admin.password)
            )
        adminRepository.save(adminWithPasswordCripty)
    }

    // Get All
    fun list(pageable: Pageable): Page<AdminModel> {
        return adminRepository.findAll(pageable)
    }

    // Get Id
    fun getById(id: Int): AdminModel {
        return adminRepository.findById(id).orElseThrow()
    }

    // Put
    fun update(admin: AdminModel){
        adminRepository.save(admin)
    }

    // Email Unique
    fun emailUnique(email: String): Boolean {
        return !adminRepository.existsByEmail(email)
    }

}





