// Starts Spring Boot + Tomcat server on port 8080

package com.triptweak.backend_booking_api

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class BackendBookingApiApplication

fun main(args: Array<String>) {
	runApplication<BackendBookingApiApplication>(*args)
}
