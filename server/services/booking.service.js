import User from "../model/auth.model.js";
import Booking from "../model/booking.model.js";
import Product from "../model/product.model.js";

const bookingServices = {
    getAllBookings: async () => {
        try {
            const bookings = await Booking.findAll({ include: [{ model: Product }, { model: User }] })
            return bookings
        } catch (error) {
            throw new Error("Error Getting bookings")
        }
    }
}

export default bookingServices