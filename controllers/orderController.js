import asyncHandler from "../middleware/asyncHandler.js"
import Product from "../models/productModels.js"
import Order from "../models/orderModel.js"

export const createOrder = asyncHandler(async (req, res) => {
    const { email, firstName, lastName, phone, cartItem } = req.body
    if (!cartItem || cartItem.length < 1) {
        res.status(400)
        throw new Error("Keranjang Kosong")
    }

    let orderItem = []
    let total = 0

    for (const cart of cartItem) {
        const productData = await Product.findOne({ _id: cart.product })
        if (!productData) {
            res.status(404)
            throw new Error("id product tidak ditemukan")
        }
        const { name, price, _id } = productData
        const singleProduct = {
            quantity: cart.quantity,
            name,
            price,
            product: _id
        }
        orderItem = [...orderItem, singleProduct]
        total += cart.quantity * price
    }
    const order = await Order.create({
        itemsDetail: orderItem,
        total,
        firstName,
        lastName,
        email,
        phone,
        user: req.user.id
    })
    return res.status(201).json({
        total,
        order,
        message: "Berhasil membuat Order Product",
    })
})

export const allOrder = asyncHandler(async (req, res) => {
    const orders = await Order.find()
    return res.status(201).json({
        data: orders,
        message: "Berhasil tampil semua Order Product"
    })
})

export const detailOrder = asyncHandler(async (req, res) => {
    const paramId = req.params.id
    const detailOrder = await Order.findById(paramId)
    return res.status(201).json({
        data: detailOrder,
        message: "Berhasil tampil detail order Product",
    })
})

export const currentUserOrder = asyncHandler(async (req, res) => {
    const order = await Order.find({
        'user': req.user.id
    })
    return res.status(201).json({
        data: order,
        message: "Berhasil tampil Current User Order Product",
    })
})

