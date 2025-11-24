package com.fdmcadastros.fdmcadastros.service

import com.fdmcadastros.fdmcadastros.controller.response.StudentAllResponse
import com.fdmcadastros.fdmcadastros.enums.student.ClassName
import com.fdmcadastros.fdmcadastros.enums.student.Status
import com.fdmcadastros.fdmcadastros.enuns.error.Errors
import com.fdmcadastros.fdmcadastros.exception.NotFoundIdException
import com.fdmcadastros.fdmcadastros.model.StudentModel
import com.fdmcadastros.fdmcadastros.repository.StudentRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service

@Service
class StudentService(
    val studentRepository: StudentRepository
) {


    // Post
    fun create(student: StudentModel) {
        studentRepository.save(student)
    }

    // Get All
    fun listAll(pageable: Pageable, className: ClassName?): Page<StudentModel> {
        className?.let{
            return studentRepository.findByClassName(className = className, pageable = pageable)
        }
        return studentRepository.findAll(pageable)
    }

    // Get Actives
    fun listActives(pageable: Pageable): Page<StudentModel> {
        return studentRepository.findByStatus(status = Status.ACTIVE, pageable)
    }

    // Get Id
    fun getById(id: Int): StudentModel {
        return studentRepository.findById(id).orElseThrow{NotFoundIdException(Errors.FDM101.message.format(id), Errors.FDM101.code)}
    }

    // Put
    fun update(student: StudentModel) {
        if(student.status == Status.ACTIVE) {
            studentRepository.save(student)
        }
        else{
            TODO("Not implemented yet")
        }
    }

    // Delete
    fun delete(id: Int){
        val student = getById(id = id)
        student.status = Status.INACTIVE

        studentRepository.save(student)
    }
}