package com.fdmcadastros.fdmcadastros.controller

import com.fdmcadastros.fdmcadastros.model.ViewMonthlyValuePerYearModel
import com.fdmcadastros.fdmcadastros.service.ViewMonthlyValuePerYearService
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
@RequestMapping("/view/monthlys")
class ViewMonthlyValuePerYearController(
    private val viewMonthlyValuePerYearService: ViewMonthlyValuePerYearService,
) {

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    fun listMonthly(@RequestParam year: Int?, @PageableDefault(page = 0, size = 12) pageable: Pageable): Page<ViewMonthlyValuePerYearModel> {
        return viewMonthlyValuePerYearService.list(pageable = pageable, year = year)
    }

}