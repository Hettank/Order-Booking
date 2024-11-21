import express from "express"
import productController from "../controllers/product.controller.js"
import upload from "../fileUpload/multerStorage.js"

const router = express.Router()

router.get("/", productController.getAllProducts)
router.get("/available-products", productController.getAvailableProducts)
router.post("/", upload.array("images", 5), productController.createProduct)
router.patch("/update-product/:productId", upload.array('images', 5), productController.updateProduct)
router.put("/delete-product/:productId", productController.deleteProduct)
router.post("/book-product/:userId", productController.bookProduct)
router.put("/edit-book-product/:userId", productController.editBookProduct)

export default router