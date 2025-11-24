package com.fdmcadastros.fdmcadastros.security

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.SignatureException
import org.springframework.stereotype.Component
import java.util.Date

@Component
class JwtUtil(
private val secretKey: SecretKey
) {
    fun generateToken(id: Int): String {
        val expiration = Date(System.currentTimeMillis() + 1000 * 3600) // 1 hora

        return Jwts.builder()
            .subject(id.toString())
            .expiration(expiration)
            .signWith(secretKey.jwtSecretKey, Jwts.SIG.HS256)
            .compact()
    }

    private fun getClains(token: String): Claims{
        try{
            return Jwts.parser()
                .verifyWith(secretKey.jwtSecretKey)
                .build()
                .parseSignedClaims(token).payload
        } catch(ex: SignatureException){
            throw SignatureException("Invalid JWT signature")
        }
    }

    fun isValidToken(token: String): Boolean{
        val claims = getClains(token)
        if(claims.subject == null || claims.expiration == null || claims.expiration.after(claims.expiration)){
            return false
        } else {
            return true
        }
    }

    fun getSubject(token: String): String{
        return getClains(token).subject
    }

}