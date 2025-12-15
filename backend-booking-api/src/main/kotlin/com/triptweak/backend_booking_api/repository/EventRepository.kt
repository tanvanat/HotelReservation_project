/*
Custom experiment counts
Spring auto-generates SQL for you
*/

package com.triptweak.backend_booking_api.repository

import com.triptweak.backend_booking_api.domain.Event
import com.triptweak.backend_booking_api.domain.Variant
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface EventRepository : JpaRepository<Event, Long> {

    fun countByVariantAndEventType(variant: Variant, eventType: String): Long
}
