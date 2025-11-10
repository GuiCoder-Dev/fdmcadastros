package com.fdmcadastros.fdmcadastros.compoundkey

import java.io.Serializable

data class ViewMonthlyKey (
    val year: Int = 0,
    val month: Int = 0
) : Serializable

