package com.triptweak.backend_booking_api.repository

import com.triptweak.backend_booking_api.domain.TrackingEvent
import org.springframework.data.jpa.repository.JpaRepository

interface TrackingEventRepository : JpaRepository<TrackingEvent, Long>
