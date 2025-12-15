/*
Seeded data: pre-loaded demo data created automatically when the app starts
Because H2 resets every time, your database starts empty
*/

package com.triptweak.backend_booking_api.config

import com.triptweak.backend_booking_api.domain.Hotel
import com.triptweak.backend_booking_api.repository.HotelRepository
import jakarta.annotation.PostConstruct
import org.springframework.stereotype.Component

@Component
class DataInitializer(
    private val hotelRepository: HotelRepository
) {

    @PostConstruct
    fun init() {
        if (hotelRepository.count() > 0) return

        val hotels = listOf(
            Hotel(
                name = "Bangkok Riverside Hotel",
                city = "Bangkok",
                pricePerNight = 120.0,
                rating = 4.5,
                imageUrl = "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg"
            ),
            Hotel(
                name = "Chiang Mai Old Town Stay",
                city = "Chiang Mai",
                pricePerNight = 80.0,
                rating = 4.3,
                imageUrl = "https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg"
            ),
            Hotel(
                name = "Phuket Beach Resort",
                city = "Phuket",
                pricePerNight = 150.0,
                rating = 4.7,
                imageUrl = "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg"
            )
        )

        hotelRepository.saveAll(hotels)
    }
}
