import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "name Product harus diisi"],
        unique: [true, "Username sudah digunakan silahkan input yang lain"]
    },
    price: {
        type: Number,
        required: [true, "Harga Product Harus Diisi"],
    },
    description: {
        type: String,
        required: [true, "Description Product harus diisi"],

    },
    image: {
        type: String,
        default: null
    },
    category: {
        type: String,
        required: [true, "Category Harus diisi"],
        enum: ['sepatu', 'kemeja', 'baju', 'celana'],
    },
    stock: {
        type: Number,
        default: 0
    }

});

const Product = mongoose.model("Product", productSchema)
export default Product