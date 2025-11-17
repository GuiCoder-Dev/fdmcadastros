package com.fdmcadastros.fdmcadastros.security

import com.fdmcadastros.fdmcadastros.service.UserDetailAdminService
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.filter.OncePerRequestFilter

class AuthorizationFilter(
    private val jwtUtil: JwtUtil,
    private val userDetailAdminService: UserDetailAdminService
): OncePerRequestFilter() {

    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse,  filterChain: FilterChain) {
        val authorizationHeader = request.getHeader("Authorization")

        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            val auth = getAuthentication(token = authorizationHeader.split(" ")[1])
            SecurityContextHolder.getContext().authentication = auth
        }
        filterChain.doFilter(request, response)
    }

    private fun getAuthentication(token: String): UsernamePasswordAuthenticationToken {
        if (!jwtUtil.isValidToken(token)) {
            throw RuntimeException("Token inválido!")
        }
        val subject: String = jwtUtil.getSubject(token)
        val admin = userDetailAdminService.loadUserByUsername(subject)
        return UsernamePasswordAuthenticationToken(admin, null, null)
    }


}