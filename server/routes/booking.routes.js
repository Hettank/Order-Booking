import express from "express"
import bookingController from "../controllers/booking.controller.js"

const router = express.Router()

router.get("/", bookingController.getAllBookings)

export default router