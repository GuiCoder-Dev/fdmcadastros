package com.fdmcadastros.fdmcadastros.validation.domain

import com.fdmcadastros.fdmcadastros.validation.isDomainValid
import jakarta.validation.ConstraintValidator
import jakarta.validation.ConstraintValidatorContext

class EmailAvaliableValidator: ConstraintValidator<EmailAvaliable, String> {

    override fun isValid(email: String?, context: ConstraintValidatorContext?): Boolean {
            if (email.isNullOrBlank() || !email.contains("@")) return false
            return isDomainValid(email)
    }
}