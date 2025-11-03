package com.fdmcadastros.fdmcadastros.controller

import com.fdmcadastros.fdmcadastros.controller.request.PostPaymentRequest
import com.fdmcadastros.fdmcadastros.controller.request.PutPaymentRequest
import com.fdmcadastros.fdmcadastros.controller.response.PaymentAllResponse
import com.fdmcadastros.fdmcadastros.extesion.toPaymentModel
import com.fdmcadastros.fdmcadastros.extesion.toPaymentResponse
import com.fdmcadastros.fdmcadastros.model.StudentModel
import com.fdmcadastros.fdmcadastros.service.PaymentService
import com.fdmcadastros.fdmcadastros.service.StudentService
import jakarta.validation.Valid
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PageableDefault
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/payments")
class PaymentController(
    val paymentService: PaymentService,
    val studentService: StudentService
) {

    @PostMapping("/effects")
    @ResponseStatus(HttpStatus.CREATED)
    fun paymentEffect(@RequestBody @Valid payment: PostPaymentRequest){
        val studentId = studentService.getById(payment.studentId)
        paymentService.payment(payment.toPaymentModel(studentId))
    }

    @GetMapping("/lists")
    @ResponseStatus(HttpStatus.OK)
    fun listPayments(@RequestParam id: Int?, @PageableDefault(page = 0, size = 10) pageable: Pageable): Page<PaymentAllResponse> {
        return paymentService.listAll(pageable = pageable, id).map {it.toPaymentResponse()}
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun updatePayment(@PathVariable id: Int, @RequestBody @Valid payment: PutPaymentRequest){
        val previousPayment = paymentService.getById(id = id)
        return paymentService.update(payment.toPaymentModel(previousPayment))
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deletePayment(@PathVariable id: Int){
        val payment = paymentService.getById(id = id)
        return paymentService.delete(id = id, payment)
    }
}