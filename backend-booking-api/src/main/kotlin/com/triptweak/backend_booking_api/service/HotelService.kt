/*
HotelService.kt: 
Fetch hotel list
Fetch hotel details
Converts database entity → DTO
*/
package com.triptweak.backend_booking_api.service

import com.triptweak.backend_booking_api.dto.HotelDto
import com.triptweak.backend_booking_api.repository.HotelRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class HotelService(
    private val hotelRepository: HotelRepository
) {

    @Transactional(readOnly = true)
    fun getAllHotels(): List<HotelDto> =
        hotelRepository.findAll().map { HotelDto.fromEntity(it) }

    @Transactional(readOnly = true)
    fun getHotelById(id: Long): HotelDto =
        hotelRepository.findById(id)
            .map { HotelDto.fromEntity(it) }
            .orElseThrow { NoSuchElementException("Hotel not found: $id") }
}
