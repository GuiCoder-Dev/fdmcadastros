package com.fdmcadastros.fdmcadastros.service

import com.fdmcadastros.fdmcadastros.enums.student.Status
import com.fdmcadastros.fdmcadastros.enuns.error.Errors
import com.fdmcadastros.fdmcadastros.exception.NotFoundIdException
import com.fdmcadastros.fdmcadastros.model.PaymentModel
import com.fdmcadastros.fdmcadastros.model.StudentModel
import com.fdmcadastros.fdmcadastros.repository.PaymentRepository
import com.fdmcadastros.fdmcadastros.repository.StudentRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service


@Service
class PaymentService(
    private val paymentRepository: PaymentRepository,
) {


    // Post
    fun payment(payment: PaymentModel) {
        if(payment.student.status == Status.ACTIVE){
            paymentRepository.save(payment)
        }
        else(
            TODO()
        )
    }

    // Get All
    fun listAll(pageable: Pageable, id: Int?): Page<PaymentModel> {
        id?.let{
            return paymentRepository.findAllByStudentId(id, pageable)
        }
        return paymentRepository.findAll(pageable)
    }


    // Get Actives
    fun listActives(pageable: Pageable, id: Int?): Page<PaymentModel> {
        id?.let{
            return paymentRepository.findAllByStudentIdAndStatus(id, Status.ACTIVE, pageable)
        }
        return paymentRepository.findStudentByStudentStatus(Status.ACTIVE, pageable)
    }

    // Get Id
    fun getById(id: Int): PaymentModel {
        return paymentRepository.findById(id).orElseThrow{ NotFoundIdException(Errors.FDM101.message.format(id), Errors.FDM101.code)
        }
    }

    // Put
    fun update(payment: PaymentModel){
        if(payment.student.status == Status.ACTIVE){
            paymentRepository.save(payment)
        }
        else {
            TODO()
        }
    }

    // Delete
    fun delete(id: Int, payment: PaymentModel) {
        if(payment.student.status == Status.ACTIVE){
            paymentRepository.deleteById(id)
        }
        else {
            TODO()
        }
    }



}