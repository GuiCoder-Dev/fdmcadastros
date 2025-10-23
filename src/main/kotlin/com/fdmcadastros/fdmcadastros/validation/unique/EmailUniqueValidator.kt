package com.fdmcadastros.fdmcadastros.validation.unique

import com.fdmcadastros.fdmcadastros.service.AdminService
import jakarta.validation.ConstraintValidator
import jakarta.validation.ConstraintValidatorContext

class EmailUniqueValidator(var admin: AdminService): ConstraintValidator<EmailUnique ,String> {

    override fun isValid(value: String?, context: ConstraintValidatorContext?): Boolean {
        if(value.isNullOrEmpty()){
            return false
        }
        return admin.emailUnique(value)
    }
}


