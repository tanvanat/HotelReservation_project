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
    npm run dev
