package com.fdmcadastros.fdmcadastros.model

import jakarta.persistence.Entity
import jakarta.persistence.IdClass
import org.hibernate.annotations.Immutable
import com.fdmcadastros.fdmcadastros.compoundkey.ViewMonthlyKey
import jakarta.persistence.Column
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.math.BigDecimal

@Entity
@Immutable
@IdClass(ViewMonthlyKey::class)
@Table(name = "view_monthly_value_per_year")
data class ViewMonthlyValuePerYearModel(
    @Id
    val year: Int,

    @Id
    val month: Int,

    @Column(name = "total_value")
    val totalValue: BigDecimal
)
