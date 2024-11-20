import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const Booking = sequelize.define('Booking', {
    fromDate: {
        type: DataTypes.DATE,
        allowNull: false
    },

    toDate: {
        type: DataTypes.DATE,
        allowNull: false
    },

    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: true
})

export default Booking