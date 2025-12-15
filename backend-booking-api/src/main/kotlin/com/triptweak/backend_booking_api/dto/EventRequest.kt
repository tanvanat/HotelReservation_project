//Represents the JSON body when frontend posts

package com.triptweak.backend_booking_api.dto

import com.triptweak.backend_booking_api.domain.Variant

data class EventRequest(
    val sessionId: String,
    val hotelId: Long,
    val variant: Variant,
    val eventType: String        // "view_hotel" | "click_book"
)
