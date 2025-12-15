//Provides CRUD operations for hotels

package com.triptweak.backend_booking_api.repository

import com.triptweak.backend_booking_api.domain.Hotel
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface HotelRepository : JpaRepository<Hotel, Long>
