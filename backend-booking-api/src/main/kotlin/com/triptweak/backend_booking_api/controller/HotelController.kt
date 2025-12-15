/*  
Endpoints:
GET /api/hotels
GET /api/hotels/{id}
*/

package com.triptweak.backend_booking_api.controller

import com.triptweak.backend_booking_api.dto.HotelDto
import com.triptweak.backend_booking_api.service.HotelService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/hotels")
@CrossOrigin
class HotelController(
    private val hotelService: HotelService
) {

    @GetMapping
    fun getAllHotels(): ResponseEntity<List<HotelDto>> =
        ResponseEntity.ok(hotelService.getAllHotels())

    @GetMapping("/{id}")
    fun getHotelById(@PathVariable id: Long): ResponseEntity<HotelDto> =
        ResponseEntity.ok(hotelService.getHotelById(id))
}
