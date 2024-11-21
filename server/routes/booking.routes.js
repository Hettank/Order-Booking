import express from "express"
import bookingController from "../controllers/booking.controller.js"

const router = express.Router()

router.get("/", bookingController.getAllBookings)
router.get("/prod-by-booking/:userId", bookingController.getProductByUser)
router.get("/booking-by-prod/:productId", bookingController.getBookingsByProd)
router.get("/prod-by-user/:userId", bookingController.getProductByUser)
router.get("/my-bookings/:userId", bookingController.myBookings)

export default router