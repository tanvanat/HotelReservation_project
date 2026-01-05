# ขั้นตอนการสร้าง backend-booking-api/

## 1.สร้างgradle wrapper
    use spring initailizr to generate the base folder (with gradlew already included)

## 2.install Java JDK 21

## 3.ไฟล์ที่ต้องสร้างมือเอง
    build.gradle.kts
    settings.gradle.kts
    src/

## 4.รายละเอียดไฟล์
    4.1.config/
    โหลดdatabaseไว้ก่อนตอนเปิดเเอป

    4.2.controlller/
    apiหลังบ้านต่างๆ

    4.3.domain/
    Database entities — mapped to tables using JPA

    4.4.DTO/
    DTO = Data Transfer Object 
    Used to send clean, lightweight data to frontend ผ่าน JSON

    4.5.repository/
    เอาข้อมูลในdatabaseมาคำนวณเเล้วเเสดงผล

    4.6.service/
    convert database to DTO

## JPA (Java Persistence API):
    A tool to let your Kotlin/Java code talk to a database without writing SQL manually

## H2 Database:
    A lightweight in-memory database used for development only
    It lives inside your Spring Boot app, in RAM (auto-reset every restart)

## 5.run backend-booking-api
    gradlew.bat bootRun

## 6.urlเข้า h2 database
    JDBC URL: jdbc:h2:mem:bookingdb
    ตามที่เราสร้าง h2 databaseจาก backend-booking-api\src\main\resources\application.yaml
    URL: http://localhost:8080/h2-console

## 7. run Postgres
    docker compose up -d
    docker ps
    $env:SPRING_PROFILES_ACTIVE="postgres"

    เมื่อมีcontainerเเล้วใช้วิธีนี้ตลอด:
    กดรันdockerจากในdocker desktop containerชื่อ->abtestingbookingui
    เเล้วค่อยรัน./gradlew bootRun

## 8.ดูlog Postgres
    jdbc:postgresql://localhost:5432/bookingdb
    ลอง stop backend แล้ว start ใหม่ (ข้อมูลควร “ยังอยู่”)
    H2 mem จะหายเมื่อ restart
    Postgres จะไม่หาย → นี่คือ proof ว่า prod-like จริง



# ขั้นตอนการสร้าง Frontend/

## 1.src/main.tsx
React start here

## 2.src/App.tsx

## 3.src/components/Layout.tsx
layoutพื้นฐานต่างๆ

- add a max-width container
- change header style
- add padding / spacing rules -once for all pages

## 4.src/index.css + Tailwind

## 5.src/pages/HotelListPage.tsx
fetchHotels() loads data

## 6.src/components/HotelCard.tsx
Structure:

image (hotel-image)
info block (hotel-info)
link button (btn-primary)

- hover animation (scale/shadow)
- nicer typography hierarchy
- price/rating badges

## 7.src/pages/HotelDetailPage.tsx

- Gets hotelId from the URL
- Chooses Variant A or B and stores it in localStorage per hotel
- Logs events (view_hotel, click_book_now)
- Renders BookNowButton with variant

## 8.src/components/BookNowButton.tsx
- stronger CTA for B (green, bigger, glow, shake, etc.)
- icon
- animated pulse (framer-motion is installed if you want)

## 9.src/pages/AdminDashboardPage.tsx

เราสามารถเเต่งให้tableสวยกว่านี้:
- rounded container card
- striped rows
- sticky header


## Run frontend/
    npm run dev

# โค้ดในการเปลื่ยนvariantจากA->B
    <!-- localStorage.setItem("triptweak_variant_searchbar", "B");
    location.reload();

    localStorage.setItem("triptweak_exp_book_cta_variant","A");
    location.reload(); -->

    localStorage.setItem("triptweak_global_variant", "A");
    location.reload();

## ให้สุ่มใหม่
    localStorage.removeItem("triptweak_exp_global_variant");
    location.reload();

## ดูว่าตอนนี้ใช้variantอะไรอยุ่

localStorage.getItem("triptweak_exp_global_variant")

Backend REST API    → http://localhost:8080/api/hotels
Health Check        → http://localhost:8080/actuator/health
GraphQL Playground  → http://localhost:8080/graphiql
H2 URL              → http://localhost:8080/h2-console
FrontEnd URL        → http://localhost:5173/

## Testing
    เราใช้postmanเพื่อทดสอบapi
    GET: http://localhost:8080/api/hotels/1 
    POST: http://localhost:8080/graphql

## วิธี Deploy Project ไป Production
    Vercel (Frontend) + Railway (Backend)
    https://vercel.com/tanvanats-projects/hotelreservation_frontend/settings/domains
    https://railway.com/project/c85bb004-c6f9-405f-beb0-1f8353218a11?environmentId=345e7e4e-f724-4b28-883e-e5fd2bbc902b
## Large Scale Thinking
    ถ้า traffic โต 100x จะทำอะไร
    ถ้า event เยอะมากจะ scale ยังไง
    ถ้า tracking ช้าจะส่ง async ยังไง

## video
<video src="Hotel-booking website.mp4" width="550" height="250" controls></video>