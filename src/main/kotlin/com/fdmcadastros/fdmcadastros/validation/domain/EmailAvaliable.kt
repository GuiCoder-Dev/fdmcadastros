package com.fdmcadastros.fdmcadastros.validation.domain

import com.fdmcadastros.fdmcadastros.validation.domain.EmailAvaliableValidator
import jakarta.validation.Constraint
import jakarta.validation.Payload
import kotlin.reflect.KClass

@Target(AnnotationTarget.FIELD)
@Retention(AnnotationRetention.RUNTIME)
@Constraint(validatedBy = [EmailAvaliableValidator::class])
annotation class EmailAvaliable(
    val message: String = "Domínio de e-mail inválido",
    val groups: Array<KClass<*>> = [],
    val payload: Array<KClass<out Payload>> = []
)