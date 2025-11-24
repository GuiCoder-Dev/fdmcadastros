package com.fdmcadastros.fdmcadastros.config

import com.fdmcadastros.fdmcadastros.repository.AdminRepository
import com.fdmcadastros.fdmcadastros.security.AuthenticationFilter
import com.fdmcadastros.fdmcadastros.security.AuthorizationFilter
import com.fdmcadastros.fdmcadastros.security.JwtUtil
import com.fdmcadastros.fdmcadastros.service.UserDetailAdminService
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
class SecurityConfig(
    private val adminRepository: AdminRepository,
) {

    val permissionRoute = arrayOf("/admin/creates")


    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    } // Bean para criptografar senha

    @Bean
    fun authenticationManager(authConfig: AuthenticationConfiguration): AuthenticationManager {
        return authConfig.authenticationManager
    }

    @Bean
    fun authenticationProvider(userDetailsService: UserDetailsService, passwordEncoder: PasswordEncoder): AuthenticationProvider {
        val provider = DaoAuthenticationProvider(userDetailsService)
        provider.setPasswordEncoder(passwordEncoder)
        return provider
    }

    @Bean
    fun filterChain(httpSecurity: HttpSecurity, authenticationManager: AuthenticationManager, jwtUtil: JwtUtil, userDetailAdminService: UserDetailAdminService): SecurityFilterChain {

        return httpSecurity

            .cors { cors -> cors.disable() }
            .csrf { csrf -> csrf.disable() }

            .authorizeHttpRequests{
                 auth -> auth
                .requestMatchers(HttpMethod.POST, *permissionRoute).permitAll()
                .requestMatchers(HttpMethod.POST, "/login").permitAll()
                .anyRequest().authenticated()
            }

            .addFilter(AuthenticationFilter(authenticationManager,adminRepository, jwtUtil))
            .addFilterBefore(
                AuthorizationFilter(jwtUtil, userDetailAdminService),
                UsernamePasswordAuthenticationFilter::class.java
            )

            .sessionManagement { sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS) }
            .build()
    }
}