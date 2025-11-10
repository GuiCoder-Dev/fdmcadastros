package com.fdmcadastros.fdmcadastros.service

import com.fdmcadastros.fdmcadastros.model.ViewMonthlyValuePerYearModel
import com.fdmcadastros.fdmcadastros.repository.ViewMonthlyValuePerYearRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service

@Service
class ViewMonthlyValuePerYearService(
    private val viewMonthlyValuePerYearRepository: ViewMonthlyValuePerYearRepository
) {


    // Get All
    fun list(pageable: Pageable, year: Int?): Page<ViewMonthlyValuePerYearModel> {
        year?.let{
            return viewMonthlyValuePerYearRepository.findByYear(year, pageable)
        }
        return viewMonthlyValuePerYearRepository.findAll(pageable)
    }
}