package com.fdmcadastros.fdmcadastros.repository

import com.fdmcadastros.fdmcadastros.compoundkey.ViewMonthlyKey
import com.fdmcadastros.fdmcadastros.model.ViewMonthlyValuePerYearModel
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository

interface ViewMonthlyValuePerYearRepository: JpaRepository<ViewMonthlyValuePerYearModel, ViewMonthlyKey> {

    fun findByYear(year: Int, pageable: Pageable): Page<ViewMonthlyValuePerYearModel>
}