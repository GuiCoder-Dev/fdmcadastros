package com.fdmcadastros.fdmcadastros.controller

import com.fdmcadastros.fdmcadastros.controller.request.PostStudentRequest
import com.fdmcadastros.fdmcadastros.controller.request.PutStudentRequest
import com.fdmcadastros.fdmcadastros.controller.response.StudentAllResponse
import com.fdmcadastros.fdmcadastros.enums.student.ClassName
import com.fdmcadastros.fdmcadastros.extesion.toStudentAllResponse
import com.fdmcadastros.fdmcadastros.extesion.toStudentModel
import com.fdmcadastros.fdmcadastros.security.UserSecurityDetails
import com.fdmcadastros.fdmcadastros.service.AdminService
import com.fdmcadastros.fdmcadastros.service.StudentService
import jakarta.validation.Valid
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PageableDefault
import org.springframework.http.HttpStatus
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/students")
class StudentController(
    private val studentService: StudentService,
    private val adminService: AdminService,
) {

    @PostMapping("/creates")
    @ResponseStatus(HttpStatus.CREATED)
    fun createStudent(@RequestBody @Valid student: PostStudentRequest, authentication: Authentication){
        val principal = authentication.principal as UserSecurityDetails
        val adminId = adminService.getById(id = principal.id)
        studentService.create(student.toStudentModel(adminId))
    }

    @GetMapping("/lists/all")
    @ResponseStatus(HttpStatus.OK)
    fun listStudent(@RequestParam className: ClassName?, @PageableDefault(page = 0, size = 10) pageable: Pageable): Page<StudentAllResponse> {
        return studentService.listAll(pageable, className).map {it.toStudentAllResponse()}
    }

    @GetMapping("/lists/actives")
    @ResponseStatus(HttpStatus.OK)
    fun listActiveStudents(@PageableDefault(page = 0, size = 10) pageable: Pageable): Page<StudentAllResponse>{
        return studentService.listActives(pageable = pageable).map {it.toStudentAllResponse()}
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun updateStudent(@PathVariable id: Int, @RequestBody @Valid student: PutStudentRequest){
        val previousStudent = studentService.getById(id = id)
        return studentService.update(student.toStudentModel(previousStudent))
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteStudent(@PathVariable id: Int){
        studentService.delete(id)
    }




    // Criar GET para ver somente os ativos
}