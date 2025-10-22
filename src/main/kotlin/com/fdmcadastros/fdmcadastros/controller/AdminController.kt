package com.fdmcadastros.fdmcadastros.controller


import com.fdmcadastros.fdmcadastros.controller.request.PostAdminRequest
import com.fdmcadastros.fdmcadastros.extesion.toAdminModel
import com.fdmcadastros.fdmcadastros.service.AdminService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/admin")
class AdminController(
    val adminService: AdminService,
) {

    @PostMapping("/creates")
    @ResponseStatus(HttpStatus.CREATED)
    fun createAdmin(@RequestBody @Valid admin: PostAdminRequest){
        adminService.create(admin.toAdminModel())
    }

}