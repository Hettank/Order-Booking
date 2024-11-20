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

            if (!foundProduct) {
                throw new Error("Product not found")
            }

            await foundProduct.destroy()
        } catch (error) {
            console.log(error)
            throw new Error("Error deleting product")
        }
    },

    bookProduct: async (fromDate, toDate, isActive, userId, productId) => {
        try {
            const user = await User.findByPk(userId)
            const product = await Product.findByPk(productId)

            const existingBooking = await Booking.findOne({ where: { ProductId: productId } })

            if (!user) {
                throw new Error("User not found")
            }

            if (!product) {
                throw new Error("Product not found")
            }

            if (existingBooking) {
                throw new Error("Item is already booked")
            }

            const newBooking = await Booking.create({
                fromDate: fromDate,
                toDate: toDate,
                isActive: isActive,
                UserId: userId,
                ProductId: productId
            })

            return newBooking
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }
}

export default productService