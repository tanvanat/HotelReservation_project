/*
Converts entity → JSON response
Prevents exposing unwanted fields
*/

package com.triptweak.backend_booking_api.dto

import com.triptweak.backend_booking_api.domain.Hotel

data class HotelDto(
    val id: Long,
    val name: String,
    val city: String,
    val pricePerNight: Double,
    val rating: Double,
    val imageUrl: String
) {
    companion object {
        fun fromEntity(hotel: Hotel): HotelDto =
            HotelDto(
                id = hotel.id ?: 0L,
                name = hotel.name,
                city = hotel.city,
                pricePerNight = hotel.pricePerNight,
                rating = hotel.rating,
                imageUrl = hotel.imageUrl
            )
    }
}
