import bookingServices from "../services/booking.service.js"

const bookingController = {
    getAllBookings: async (req, res) => {
        try {
            let { page, limit } = req.query

            page = parseInt(page) || 1
            limit = parseInt(limit) || 10

            const bookings = await bookingServices.getAllBookings(page, limit)
            res.status(200).json(bookings)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },

    getProductByUser: async (req, res) => {
        try {
            const { userId } = req.params;

            const product = await bookingServices.getProductByUser(userId);

            if (!product) {
                return res.status(404).json({ error: "Product Not Found" });
            }

            res.status(200).json(product);
        } catch (error) {
            console.log("controller error:", error);
            res.status(500).json({ error: error.message });
        }
    },

    getBookingsByProd: async (req, res) => {
        try {
            const { productId } = req.params

            const booking = await bookingServices.getBookingsByProd(productId)

            res.status(200).json(booking)
        } catch (error) {
            if (error.message.includes("Booking not found")) {
                return res.status(404).json({ error: error.message })
            }

            return res.status(500).json({ error: "Internal server error" })
        }
    },

    myBookings: async (req, res) => {
        try {
            const { userId } = req.params

            const booking = await bookingServices.myBookings(userId)

            if (!booking) {
                res.status(404).json({ message: "Booking not found" })
            }

            res.status(200).json(booking)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

export default bookingController