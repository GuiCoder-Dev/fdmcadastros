package com.fdmcadastros.fdmcadastros.security

import io.github.cdimascio.dotenv.dotenv
import org.springframework.stereotype.Component
import javax.crypto.spec.SecretKeySpec

@Component
class SecretKey {

    private val dotenv = dotenv()
    val jwtSecret: String = dotenv["JWT_SECRET"]
    val jwtSecretKey = SecretKeySpec(jwtSecret.toByteArray(), "HmacSHA256")


}

