/*
Handles A/B testing logic:
Save events
Count views/clicks for variant A or B
Compute conversion rate
*/
package com.triptweak.backend_booking_api.service

import com.triptweak.backend_booking_api.domain.Event
import com.triptweak.backend_booking_api.domain.Variant
import com.triptweak.backend_booking_api.dto.EventRequest
import com.triptweak.backend_booking_api.dto.VariantMetricsDto
import com.triptweak.backend_booking_api.repository.EventRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class MetricsService(
    private val eventRepository: EventRepository
) {

    @Transactional
    fun recordEvent(request: EventRequest) {
        val event = Event(
            sessionId = request.sessionId,
            hotelId = request.hotelId,
            variant = request.variant,
            eventType = request.eventType
        )
        eventRepository.save(event)
    }

    @Transactional(readOnly = true)
    fun getMetrics(): List<VariantMetricsDto> {
        return Variant.entries.map { variant ->
            val views = eventRepository.countByVariantAndEventType(variant, "view_hotel")
            val clicks = eventRepository.countByVariantAndEventType(variant, "click_book")
            val conversionRate = if (views > 0) {
                (clicks.toDouble() / views.toDouble())
            } else {
                0.0
            }

            VariantMetricsDto(
                variant = variant,
                views = views,
                clicks = clicks,
                conversionRate = String.format("%.4f", conversionRate).toDouble()
            )
        }
    }
}
