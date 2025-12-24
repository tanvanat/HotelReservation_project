package com.triptweak.backend_booking_api.domain

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "tracking_events")
data class TrackingEvent(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(nullable = false)
    val sessionId: String,

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    val variant: Variant,

    @Column(nullable = false)
    val eventName: String, // SEARCH_TYPED / SEARCH_SUBMITTED / FIRST_HOTEL_CLICK

    val keyword: String? = null,
    val source: String? = null, // enter | button
    val keywordLength: Int? = null,

    val hotelId: Long? = null,
    val msToFirstClick: Long? = null,

    @Column(nullable = false)
    val createdAt: Instant = Instant.now()
)
