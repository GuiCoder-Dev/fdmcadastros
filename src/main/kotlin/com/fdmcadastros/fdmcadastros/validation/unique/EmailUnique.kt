package com.fdmcadastros.fdmcadastros.validation.unique

import jakarta.validation.Constraint
import jakarta.validation.Payload
import kotlin.reflect.KClass

@Target(AnnotationTarget.FIELD)
@Retention(AnnotationRetention.RUNTIME)
@Constraint(validatedBy = [EmailUniqueValidator::class])
annotation class EmailUnique(
    val message: String = "Domínio de e-mail inválido",
    val groups: Array<KClass<*>> = [],
    val payload: Array<KClass<out Payload>> = []
)