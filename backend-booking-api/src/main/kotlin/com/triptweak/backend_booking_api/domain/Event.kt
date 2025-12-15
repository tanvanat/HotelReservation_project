//Represents user interaction

package com.triptweak.backend_booking_api.domain

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "events")
data class Event(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(name = "session_id", nullable = false)
    val sessionId: String,

    @Column(name = "hotel_id", nullable = false)
    val hotelId: Long,

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    val variant: Variant,

    @Column(name = "event_type", nullable = false)
    val eventType: String,   // "view_hotel" | "click_book"

    @Column(name = "created_at", nullable = false)
    val createdAt: Instant = Instant.now()
)
