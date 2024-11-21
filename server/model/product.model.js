import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false
    },

    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    remarks: {
        type: DataTypes.STRING,
        allowNull: false
    },

    images: {
        type: DataTypes.JSON
    }
}, {
    timestamps: true
})

export default Product