package com.fdmcadastros.fdmcadastros.service

import com.fdmcadastros.fdmcadastros.model.ViewTotalStudentModel
import com.fdmcadastros.fdmcadastros.repository.ViewTotalStudentRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service

@Service
class ViewTotalStudentService(
    private val viewTotalStudentRepository: ViewTotalStudentRepository
) {

    // Get All
    fun listAll(pageable: Pageable, id: Int?): Page<ViewTotalStudentModel> {
        id?.let{
            return viewTotalStudentRepository.findByStudentId(id, pageable)
        }
        return viewTotalStudentRepository.findAll(pageable)
    }

}