package com.triptweak.backend_booking_api.dto

import com.triptweak.backend_booking_api.domain.Variant

data class TrackEventRequest(
    val sessionId: String,
    val variant: Variant,
    val eventName: String,

    val keyword: String? = null,
    val source: String? = null,
    val keywordLength: Int? = null,

    val hotelId: Long? = null,
    val msToFirstClick: Long? = null
)
