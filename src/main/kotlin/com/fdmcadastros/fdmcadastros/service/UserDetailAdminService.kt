package com.fdmcadastros.fdmcadastros.service

import com.fdmcadastros.fdmcadastros.enuns.error.Errors
import com.fdmcadastros.fdmcadastros.exception.NotFoundIdException
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
        val admin = adminRepository.findById(id.toInt()).orElseThrow{NotFoundIdException(Errors.FDM101.message.format(id), Errors.FDM101.code)}
        return UserSecurityDetails(admin)
    }
}