import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from './asyncHandler.js'


export const protectedMiddleware = asyncHandler(async (req, res, next) => {
    // cek kondisi apakah user sudah mendapatkan token atau belum
    let token
    token = req.cookies.jwt
    // jiksa sudah dapat
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            // next ke middleware selanjutnya
            next()

        } catch (error) {
            // jika belum login atau belum memiliki token lemparkan errornya
            res.status(401)
            throw new Error("Not Authorized token fail")
        }
    } else {
        res.status(401)
        throw new Error("not Authorized,no token")
    }
})

export const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === 'owner') {
        next()
    }
    else {
        res.status(401)
        throw new Error('Not Authorized as Owner')
    }
}





