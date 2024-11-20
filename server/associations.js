import User from "./model/auth.model.js"
import Product from "./model/product.model.js"
import Booking from "./model/booking.model.js"

User.hasMany(Booking)
Booking.belongsTo(User)

Product.hasMany(Booking)
Booking.belongsTo(Product)