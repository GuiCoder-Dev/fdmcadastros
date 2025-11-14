package com.fdmcadastros.fdmcadastros.security

import com.fdmcadastros.fdmcadastros.model.AdminModel
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

class UserSecurityDetails(val admin: AdminModel): UserDetails {

    val id: Int = admin.id!!

    override fun getAuthorities(): Collection<GrantedAuthority?>? {
        return mutableListOf()
    }

    override fun getPassword(): String {
        return admin.password
    }

    override fun getUsername(): String {
        return admin.id.toString()
    }

    override fun isEnabled(): Boolean {
        return true
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

}