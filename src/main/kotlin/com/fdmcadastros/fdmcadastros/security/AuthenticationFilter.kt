package com.fdmcadastros.fdmcadastros.security

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fdmcadastros.fdmcadastros.controller.request.LoginRequest
import com.fdmcadastros.fdmcadastros.repository.AdminRepository
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

class AuthenticationFilter(
    authenticationManager: AuthenticationManager,
    private val adminRepository: AdminRepository,
    private val jwtUtil: JwtUtil
): UsernamePasswordAuthenticationFilter(authenticationManager) {

    override fun attemptAuthentication(request: HttpServletRequest, response: HttpServletResponse): Authentication {

        try{
            val loginRequest = jacksonObjectMapper().readValue(request.inputStream, LoginRequest::class.java) // pego o /login
            val id = adminRepository.findByEmail(loginRequest.email)?.id
            val authenticationToken = UsernamePasswordAuthenticationToken(id, loginRequest.password)

            return authenticationManager.authenticate(authenticationToken)
        } catch (exception: Exception) {
            throw RuntimeException("Falha na autenticação", exception)
        }
    }

    override fun successfulAuthentication(request: HttpServletRequest, response: HttpServletResponse,  chain: FilterChain, authResult: Authentication) {
        val id = (authResult.principal as UserSecurityDetails).id

        val token = jwtUtil.generateToken(id)
        response.addHeader("Authorization", "Bearer $token")
    }
}