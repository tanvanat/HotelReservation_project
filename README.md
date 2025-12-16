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
