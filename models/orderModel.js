import mongoose from "mongoose";
import { Schema } from "mongoose";
import validator from "validator";

const singleProduct = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true
    }
})

const orderSchema = new Schema({
    total: {
        type: Number,
        required: [true, "Total harga harus diisi"]
    },
    itemsDetail: [singleProduct],
    user: {
        type: Schema.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "failed", "success"],
        default: "pending"
    },
    firstName: {
        type: String,
        required: [true, "Nama Depan Harus Diisi"]
    },
    lastName: {
        type: String,
        required: [true, "Nama Belakang Harus Diisi"]
    },
    email: {
        type: String,
        required: [true, "Email Harus Diisi"],
        isEmail: true,
        validate: {
            validator: validator.isEmail,
            message: "Inputan harus Berformat Email example@gmail.com"
        }
    },
    phone: {
        type: String,
        required: [true, "Nomor telepon Harus Diisi"]
    }
})

const Order = mongoose.model("Order", orderSchema)
export default Order;
