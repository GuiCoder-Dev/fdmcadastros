package com.fdmcadastros.fdmcadastros.extesion

import com.fdmcadastros.fdmcadastros.controller.request.PostAdminRequest
import com.fdmcadastros.fdmcadastros.controller.request.PostStudentRequest
import com.fdmcadastros.fdmcadastros.controller.request.PutAdminRequest
import com.fdmcadastros.fdmcadastros.controller.request.PutStudentRequest
import com.fdmcadastros.fdmcadastros.controller.response.AdminAllResponse
import com.fdmcadastros.fdmcadastros.controller.response.AdminForStudent
import com.fdmcadastros.fdmcadastros.controller.response.StudentAllResponse
import com.fdmcadastros.fdmcadastros.enums.student.Status
import com.fdmcadastros.fdmcadastros.model.AdminModel
import com.fdmcadastros.fdmcadastros.model.StudentModel

// Request to Model
fun PostAdminRequest.toAdminModel(): AdminModel{
    return AdminModel(
        name = this.name,
        email = this.email,
        password = this.password,
    )
}

// Request to Model
fun PutAdminRequest.toAdminModel(previousValue: AdminModel): AdminModel {
    return AdminModel(
        id = previousValue.id,
        name = this.name ?: previousValue.name,
        email = this.email ?: previousValue.email,
        password = previousValue.password
    )
}

// Request to Model
fun PostStudentRequest.toStudentModel(admin: AdminModel): StudentModel {
    return StudentModel(
        admin = admin,
        name = this.name,
        responsibleAdult = this.responsibleAdult,
        monthlyPayment = this.monthlyPayment,
        registrationFee = this.registrationFee,
        registrationDate = this.registrationDate,
        birthdayDate = this.birthdayDate,
        className = this.className,
        modality = this.modality,
        status = Status.ACTIVE
    )
}

// Request to Model
fun PutStudentRequest.toStudentModel(previousValue: StudentModel): StudentModel {
    return StudentModel(
        id = previousValue.id,
        admin = previousValue.admin,
        name = this.name ?: previousValue.name,
        responsibleAdult = this.responsibleAdult ?: previousValue.responsibleAdult,
        monthlyPayment = this.monthlyPayment ?: previousValue.monthlyPayment,
        registrationFee = previousValue.registrationFee,
        registrationDate = previousValue.registrationDate,
        birthdayDate = previousValue.birthdayDate,
        className = this.className ?: previousValue.className,
        modality = this.modality ?: previousValue.modality,
        status = previousValue.status,
    )
}



//------------------

// Model to Response
fun AdminModel.toAdminAllResponse(): AdminAllResponse {
    return AdminAllResponse(
        id = this.id,
        name = this.name,
        email = this.email,
    )
}


// Model to Response
fun AdminModel.toAdminForStudent(): AdminForStudent{
    return AdminForStudent(
        id = this.id,
        name = this.name,
    )
}

// Model to Response
fun StudentModel.toStudentAllResponse(): StudentAllResponse {
    return StudentAllResponse(
        id = this.id,
        name = this.name,
        admin = admin.toAdminForStudent(),
        responsibleAdult = this.responsibleAdult,
        monthlyPayment =  this.monthlyPayment,
        registrationFee =  this.registrationFee,
        registrationDate =  this.registrationDate,
        birthdayDate = this.birthdayDate,
        className =  this.className,
        modality = this.modality,
        status = this.status,
    )
}