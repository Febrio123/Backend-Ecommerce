import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModels.js";


export const createProduct = asyncHandler(async (req, res) => {
    const newProduct = await Product.create(req.body)
    return res.status(201).json({
        message: "Berhasil Tambah Product",
        data: newProduct
    })
})

export const allProduct = asyncHandler(async (req, res) => {
    // filter product req.query
    const queryObj = { ...req.query }
    // fungsi untuk mengabaikan jika ada req page dan limit
    const excludeField = ["page", "limit", "name"]
    excludeField.forEach((element) => delete queryObj[element])

    let query
    if (req.query.name) {
        query = Product.find({
            name: { $regex: req.query.name, $options: "i" }
        })
    } else {
        query = Product.find(queryObj)
    }


    // pagination
    const page = req.query * 1 || 1
    const limitData = req.query.limit * 1 || 30
    const skipData = (page - 1) * limitData


    query = query.skip(skipData).limit(limitData)

    let countProduct = await Product.countDocuments()
    if (req.query.page) {
        if (skipData >= countProduct) {
            res.status(404)
            throw new Error("This Page doesnt exist")
        }
    }

    const data = await query

    return res.status(200).json({
        message: "Berhasil get All Product",
        data,
        count: countProduct
    })
})

export const detailProduct = asyncHandler(async (req, res) => {
    let paramsId = req.params.id
    const getProductById = await Product.findById(paramsId)
    if (!getProductById) {
        res.status(404)
        throw new Error("id tidak ditemukan")
    }
    return res.status(200).json({
        message: "Berhasil get Detail Product",
        data: getProductById
    })

})

export const updateProduct = asyncHandler(async (req, res) => {
    let paramsId = req.params.id
    const updateProduct = await Product.findByIdAndUpdate(paramsId, req.body, {
        runValidators: false,
        new: true
    })
    return res.status(200).json({
        message: "Data berhasil di Update",
        data: updateProduct
    })
})

export const deleteProduct = asyncHandler(async (req, res) => {
    let paramsId = req.params.id
    await Product.findByIdAndDelete(paramsId)
    return res.status(200).json({
        message: "Data berhasil dihapus",
    })
})

export const fileUpload = asyncHandler(async (req, res) => {
    const file = req.file
    if (!file) {
        res.status(400)
        throw new Error("Tidak ada file yang dihapus")
    }
    const imageFileName = file.filename
    const pathImageFile = `/uploads/${ imageFileName }`

    res.status(200).json({
        message: "image berhasil diupload",
        image: pathImageFile
    })
})