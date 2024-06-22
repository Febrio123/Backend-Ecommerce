import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt'
const { Schema } = mongoose;


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "name harus diisi"],
        unique: [true, "Username sudah digunakan"]
    },
    email: {
        type: String,
        required: [true, "email harus diisi"],
        unique: [true, "email sudah pernah didaftarkan"],
        validate: {
            validator: validator.isEmail,
            message: "Inputan harus Berformat Email example@gmail.com"
        }
    },
    password: {
        type: String,
        required: [true, "password harus diisi"],
        minLength: [6, "password minimal 6 karakter"]
    },
    role: {
        type: String,
        enum: ["user", "owner"],
        default: "user"
    }


});

userSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.comparePassword = async function (reqBody) {
    return await bcrypt.compare(reqBody, this.password)
}
const User = mongoose.model("User", userSchema)
export default User