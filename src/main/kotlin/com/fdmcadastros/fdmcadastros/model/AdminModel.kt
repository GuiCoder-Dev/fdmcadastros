package com.fdmcadastros.fdmcadastros.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id

@Entity(name = "admin")
data class AdminModel(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null,

    @Column(name = "name")
    var name: String,

    @Column(name = "email")
    var email: String,

    @Column(name = "password")
    var password: String,
)




