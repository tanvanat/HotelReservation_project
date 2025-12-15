//Represents the computed experiment metrics

package com.triptweak.backend_booking_api.dto

import com.triptweak.backend_booking_api.domain.Variant

data class VariantMetricsDto(
    val variant: Variant,
    val views: Long,
    val clicks: Long,
    val conversionRate: Double
)
