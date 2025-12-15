/*  
Endpoints:
POST /api/events → record user events
GET /api/metrics → calculate A/B testing results
*/

package com.triptweak.backend_booking_api.controller

import com.triptweak.backend_booking_api.dto.EventRequest
import com.triptweak.backend_booking_api.dto.VariantMetricsDto
import com.triptweak.backend_booking_api.service.MetricsService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
@CrossOrigin
class EventController(
    private val metricsService: MetricsService
) {

    @PostMapping("/events")
    fun recordEvent(@RequestBody request: EventRequest): ResponseEntity<Void> {
        metricsService.recordEvent(request)
        return ResponseEntity.status(201).build()
    }

    @GetMapping("/metrics")
    fun getMetrics(): ResponseEntity<List<VariantMetricsDto>> =
        ResponseEntity.ok(metricsService.getMetrics())
}
