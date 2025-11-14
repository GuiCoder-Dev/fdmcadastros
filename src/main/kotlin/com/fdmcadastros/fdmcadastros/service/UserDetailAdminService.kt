package com.fdmcadastros.fdmcadastros.service

import com.fdmcadastros.fdmcadastros.repository.AdminRepository
import com.fdmcadastros.fdmcadastros.security.UserSecurityDetails
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service

@Service
class UserDetailAdminService(
    private val adminRepository: AdminRepository
): UserDetailsService {

    override fun loadUserByUsername(id: String): UserDetails {
        val admin = adminRepository.findById(id.toInt()).orElseThrow()
        return UserSecurityDetails(admin)
    }
}