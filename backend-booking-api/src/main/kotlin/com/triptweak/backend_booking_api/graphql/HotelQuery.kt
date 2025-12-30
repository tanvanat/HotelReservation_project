package com.triptweak.backend_booking_api.graphql

import com.triptweak.backend_booking_api.domain.Hotel
import com.triptweak.backend_booking_api.repository.HotelRepository
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.stereotype.Controller

@Controller
class HotelQuery(
    private val hotelRepository: HotelRepository
) {

    @QueryMapping
    fun hotels(@Argument keyword: String?): List<Hotel> {
        val k = keyword?.trim()?.lowercase()
        if (k.isNullOrBlank()) return hotelRepository.findAll()

        return hotelRepository.findAll().filter {
            it.name.lowercase().contains(k) ||
            it.city.lowercase().contains(k)
        }
    }

    @QueryMapping
    fun hotel(@Argument id: Long): Hotel? {
        return hotelRepository.findById(id).orElse(null)
    }
}
