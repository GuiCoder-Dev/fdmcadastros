package com.fdmcadastros.fdmcadastros.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain

@Configuration
@EnableWebSecurity
class SecurityConfig {

    @Bean
    fun filterChain(httpSecurity: HttpSecurity): SecurityFilterChain {

        return httpSecurity

            .cors { cors -> cors.disable() }
            .csrf { csrf -> csrf.disable() }

            .sessionManagement { sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS) }
            .build()
    }
}