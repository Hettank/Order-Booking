import bookingServices from "../services/booking.service.js"

const bookingController = {
    getAllBookings: async (req, res) => {
        try {
            const bookings = await bookingServices.getAllBookings()
            res.status(200).json(bookings)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },
}

export default bookingController