package com.fdmcadastros.fdmcadastros.validation

import jakarta.validation.Constraint
import kotlin.reflect.KClass
import jakarta.validation.Payload

@Target(AnnotationTarget.FIELD)
@Retention(AnnotationRetention.RUNTIME)
@Constraint(validatedBy = [EmailAvaliableValidator::class])
annotation class EmailAvaliable(
    val message: String = "Domínio de e-mail inválido",
    val groups: Array<KClass<*>> = [],
    val payload: Array<KClass<out Payload>> = []
)
