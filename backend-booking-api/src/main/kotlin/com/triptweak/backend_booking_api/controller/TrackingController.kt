package com.triptweak.backend_booking_api.controller

import com.triptweak.backend_booking_api.domain.TrackingEvent
import com.triptweak.backend_booking_api.dto.TrackEventRequest
import com.triptweak.backend_booking_api.repository.TrackingEventRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
@CrossOrigin
class TrackingController(
    private val repo: TrackingEventRepository
) {
    @PostMapping("/track-events")
    fun track(@RequestBody req: TrackEventRequest): ResponseEntity<Void> {
        repo.save(
            TrackingEvent(
                sessionId = req.sessionId,
                variant = req.variant,
                eventName = req.eventName,
                keyword = req.keyword,
                source = req.source,
                keywordLength = req.keywordLength,
                hotelId = req.hotelId,
                msToFirstClick = req.msToFirstClick
            )
        )
        return ResponseEntity.ok().build()
    }
}
