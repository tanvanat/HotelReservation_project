/*
Hotel Database
*/
package com.triptweak.backend_booking_api.domain

import jakarta.persistence.*

@Entity
@Table(name = "hotels")
data class Hotel(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    val name: String,

    val city: String,

    @Column(name = "price_per_night")
    val pricePerNight: Double,

    val rating: Double,

    @Column(name = "image_url")
    val imageUrl: String
)
