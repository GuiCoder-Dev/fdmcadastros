package com.fdmcadastros.fdmcadastros.validation.domain

import java.util.Hashtable
import javax.naming.directory.InitialDirContext

fun isDomainValid(email: String): Boolean {
    val domain = email.substringAfter("@", "")
    if (domain.isBlank()) return false

    return try {
        val env = mapOf("java.naming.factory.initial" to "com.sun.jndi.dns.DnsContextFactory")
        val ctx = InitialDirContext(Hashtable(env))
        val attrs = ctx.getAttributes(domain, arrayOf("MX"))
        attrs.get("MX") != null // domínio existe
    } catch (ex: Exception) {
        false // domínio não encontrado
    }
}