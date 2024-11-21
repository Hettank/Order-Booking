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

    getAvailableProducts: async (req, res) => {
        try {
            const { fromDate, toDate } = req.query;

            if (!fromDate || !toDate) {
                const products = await productService.getAllProducts()
                return res.status(200).json(products);
            }

            const availableProducts = await productService.getAvailableProducts(fromDate, toDate);
            res.status(200).json(availableProducts);
        } catch (error) {
            res.status(400).json({ error: error.message });
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
            const statusCode = error.message.includes("not found") ? 404 : 400;
            res.status(statusCode).json({ error: error.message });
        }
    },

    bookProduct: async (req, res) => {
        try {
            const { userId } = req.params

            const { fromDate, toDate, productName } = req.body
            const productId = productName

            const product = await productService.bookProduct(fromDate, toDate, userId, productId)

            res.status(200).json({ product })
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    },

    editBookProduct: async (req, res) => {
        try {
            const { userId } = req.params

            const { fromDate, toDate, productName } = req.body
            const productId = productName

            const product = await productService.editBookProduct(fromDate, toDate, userId, productId)

            res.status(200).json({ product })
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }
}

export default productController