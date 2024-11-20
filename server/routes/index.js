import express from "express"

import productRoutes from "./product.routes.js"
import authRoutes from "./auth.routes.js"
import bookingRoutes from "./booking.routes.js"

const router = express.Router()

router.use("/auth", authRoutes)
router.use("/products", productRoutes)
router.use("/bookings", bookingRoutes)

export default router