import productService from "../services/product.service.js";

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const procuts = await productService.getAllProducts()
            res.status(200).json(procuts)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },

    createProduct: async (req, res) => {
        try {
            const { name, description, price } = req.body

            const imagePaths = req.files && req.files.length > 0
                ? req.files.map(file => file.path)
                : [];

            const products = await productService.createProduct(name, description, price, imagePaths)
            res.status(201).json(products)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }

    },

    updateProduct: async (req, res) => {
        try {
            const { name, description, price } = req.body

            const { productId } = req.params

            const imagePaths = req.files && req.files.length > 0
                ? req.files.map(file => file.path)
                : [];

            const updatedProduct = await productService.updateProduct(name, description, price, imagePaths, productId)
            res.status(200).json(updatedProduct)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const { productId } = req.params

            await productService.deleteProduct(productId)
            res.status(200).json({ message: "Deleted Successfully" })
        } catch (error) {
            res.status(200).json({ error: error.message })
        }
    },

    bookProduct: async (req, res) => {
        try {
            const { userId, productId } = req.params

            const { fromDate, toDate, isActive } = req.body

            const product = await productService.bookProduct(fromDate, toDate, isActive, userId, productId)

            res.status(200).json({ product })
        } catch (error) {
            res.status(200).json({ error: error.message })
        }
    }
}

export default productController