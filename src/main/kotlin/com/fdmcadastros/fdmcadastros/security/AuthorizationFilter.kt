package com.fdmcadastros.fdmcadastros.security

import com.fdmcadastros.fdmcadastros.enuns.error.Errors
import com.fdmcadastros.fdmcadastros.service.UserDetailAdminService
import io.jsonwebtoken.ExpiredJwtException
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.HttpStatus
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.filter.OncePerRequestFilter

class AuthorizationFilter(
    private val jwtUtil: JwtUtil,
    private val userDetailAdminService: UserDetailAdminService
): OncePerRequestFilter() {

    override fun doFilterInternal( request: HttpServletRequest,  response: HttpServletResponse,  filterChain: FilterChain) {
        try {
            val authorizationHeader = request.getHeader("Authorization")

            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                val token = authorizationHeader.split(" ")[1]
                val auth = getAuthentication(token)
                SecurityContextHolder.getContext().authentication = auth
            }

            filterChain.doFilter(request, response)

        } catch (ex: io.jsonwebtoken.ExpiredJwtException) {
            // === RESPOSTA PRO TOKEN EXPIRADO ===
            response.status = HttpStatus.FORBIDDEN.value()
            response.contentType = "application/json"
            response.writer.write(
                """
                {
                  "message": "${Errors.FDM602.message}",
                  "internalCode": "${Errors.FDM602.code}",
                  "httpStatusCode": 403
                }
            """.trimIndent()
            )
        }

    }

    fun getAuthentication(token: String): UsernamePasswordAuthenticationToken {
        if (!jwtUtil.isValidToken(token)) {
            throw RuntimeException("Token expirado!")
        }
        val subject: String = jwtUtil.getSubject(token)
        val admin = userDetailAdminService.loadUserByUsername(subject)
        return UsernamePasswordAuthenticationToken(admin, null, null)
    }
}




