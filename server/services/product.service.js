import { Op } from "sequelize";
import User from "../model/auth.model.js";
import Booking from "../model/booking.model.js";
import Product from "../model/product.model.js";

const productService = {
    getAllProducts: async () => {
        try {
            const procuts = await Product.findAll()
            return procuts
        } catch (error) {
            console.log(error)
            throw new Error("Error getting products")
        }
    },

    getAvailableProducts: async (fromDate, toDate) => {
        try {
            const unavailableProducts = await Booking.findAll({
                attributes: ["ProductId"],
                where: {
                    [Op.or]: [
                        { fromDate: { [Op.between]: [fromDate, toDate] } },
                        { toDate: { [Op.between]: [fromDate, toDate] } },
                        {
                            fromDate: { [Op.lte]: fromDate },
                            toDate: { [Op.gte]: toDate },
                        }
                    ]
                }
            })

            const unavailableProductIds = unavailableProducts.map((booking) => booking.ProductId)

            const availableProducts = await Product.findAll({
                where: {
                    id: { [Op.notIn]: unavailableProductIds }
                }
            })

            return availableProducts
        } catch (error) {
            console.log(error);
            throw new Error("Error fetching available products");
        }
    },

    createProduct: async (name, description, price, imagePaths) => {
        try {
            const products = await Product.create({
                name,
                description,
                price,
                images: imagePaths
            })

            return products
        } catch (error) {
            console.log(error)
            throw new Error("Error creating products")
        }
    },

    updateProduct: async (name, description, price, imagePaths, productId) => {
        try {
            const foundProduct = await Product.findByPk(productId)

            const product = foundProduct.update({
                name,
                description,
                price,
                images: imagePaths
            })

            return product
        } catch (error) {
            console.log(error)
            throw new Error("Error updating product")
        }
    },

    deleteProduct: async (productId) => {
        try {
            const foundProduct = await Product.findByPk(productId)

            const booking = await Booking.findOne({ where: { ProductId: productId } })

            if (!foundProduct) {
                throw new Error("Product not found")
            }

            if (booking) {
                throw new Error("Cannot delete product. It has active bookings.")
            }

            await foundProduct.destroy()

            return { message: "Product deleted successfully" };
        } catch (error) {
            console.log(error)
            throw new Error(error.message || "Error deleting product");
        }
    },

    bookProduct: async (fromDate, toDate, userId, productId) => {
        try {
            const product = await Product.findByPk(productId)
            const user = await User.findByPk(userId)

            // const existingBooking = await Booking.findOne({
            //     where: {
            //         [Op.or]: [
            //             { fromDate: { [Op.between]: [fromDate, toDate] } },
            //             { toDate: { [Op.between]: [fromDate, toDate] } },
            //             { fromDate: { [Op.lte]: fromDate } },
            //             { toDate: { [Op.gte]: toDate } },
            //         ]
            //     }
            // })

            // if (existingBooking) {
            //     throw new Error("Product is already booked for the selected dates.")
            // }

            if (!user) {
                throw new Error("User not found")
            }

            if (!product) {
                throw new Error("Product not found")
            }

            const newBooking = await Booking.create({
                fromDate: fromDate,
                toDate: toDate,
                isActive: true,
                UserId: userId,
                ProductId: productId
            })

            return newBooking
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    },

    editBookProduct: async (fromDate, toDate, userId, productId) => {
        try {
            const booking = await Booking.findOne({
                where: {
                    UserId: userId,
                    ProductId: productId
                }
            })

            if (!booking) {
                throw new Error("Booking not found")
            }

            const updatedBooking = booking.update({
                fromDate: fromDate,
                toDate: toDate,
                UserId: userId,
                ProductId: productId,
            })

            return updatedBooking
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }
}

export default productService