package com.fdmcadastros.fdmcadastros.controller


import com.fdmcadastros.fdmcadastros.controller.request.PostAdminRequest
import com.fdmcadastros.fdmcadastros.controller.request.PutAdminRequest
import com.fdmcadastros.fdmcadastros.controller.response.AdminAllResponse
import com.fdmcadastros.fdmcadastros.extesion.toAdminAllResponse
import com.fdmcadastros.fdmcadastros.extesion.toAdminModel
import com.fdmcadastros.fdmcadastros.service.AdminService
import jakarta.validation.Valid
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PageableDefault
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

    @GetMapping("/lists")
    @ResponseStatus(HttpStatus.OK)
    fun listAdmin(@PageableDefault(page = 0, size = 10) pageable: Pageable): Page<AdminAllResponse> {
        return adminService.list(pageable).map {it.toAdminAllResponse()}
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun updateAdmin(@PathVariable id: Int, @RequestBody @Valid admin: PutAdminRequest){
        val previousAdmin = adminService.getById(id)
        adminService.update(admin.toAdminModel(previousAdmin))
    }

}