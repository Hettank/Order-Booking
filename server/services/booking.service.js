import User from "../model/auth.model.js";
import Booking from "../model/booking.model.js";
import Product from "../model/product.model.js";

const bookingServices = {
    getAllBookings: async (page, limit) => {
        try {
            const offset = (page - 1) * limit

            const bookings = await Booking.findAndCountAll({
                include: [{ model: Product }, { model: User }],
                offset: offset,
                limit: limit
            })

            // const currentDate = new Date()

            // for (let booking of bookings) {
            //     if (currentDate > new Date(booking.toDate)) {
            //         booking.isActive = false
            //     } else {
            //         booking.isActive = true
            //     }

            //     await booking.save()
            // }

            return bookings
        } catch (error) {
            console.log(error)
            throw new Error("Error Getting bookings")
        }
    },


    getProductByUser: async (userId) => {
        try {
            const product = await Booking.findOne({
                where: {
                    UserId: userId
                }
            })

            if (!product) {
                throw new Error("Product Not Found")
            }

            return product
        } catch (error) {
            throw new Error("Error getting specific booking")
        }
    },

    getBookingsByProd: async (productId) => {
        try {
            const booking = await Booking.findOne({ where: { ProductId: productId } })

            if (!productId) {
                throw new Error("Booking not found")
            }

            return booking
        } catch (error) {
            throw new Error(error)
        }
    },

    myBookings: async (userId) => {
        try {
            const booking = await Booking.findAll({
                where: {
                    UserId: userId
                },
                include: {
                    model: Product,
                    attributes: ["id", "name"]
                }
            })

            console.log("my bookings:", booking)

            if (!booking) {
                throw new Error("Booking not found")
            }

            return booking
        } catch (error) {
            throw new Error("Error getting specific booking")
        }
    }
}

export default bookingServices