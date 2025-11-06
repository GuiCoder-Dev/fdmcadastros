package com.fdmcadastros.fdmcadastros.controller

import com.fdmcadastros.fdmcadastros.model.ViewTotalStudentModel
import com.fdmcadastros.fdmcadastros.service.ViewTotalStudentService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PageableDefault
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/view/paids")
class ViewTotalStudentController(
    private val viewTotalStudentService: ViewTotalStudentService
){

    @GetMapping("/list/all")
    @ResponseStatus(HttpStatus.OK)
    fun listPaid(@RequestParam id: Int?, @PageableDefault(page = 0, size = 10) pageable: Pageable): Page<ViewTotalStudentModel> {
        return viewTotalStudentService.listAll(pageable, id)
    }



}
