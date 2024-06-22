import multer from 'multer'
import path from 'path'

const FILE_TYPE = {
    'image/png': "png",
    'image/jpg': "jpg",
    'image/jpeg': "jpeg"
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValidFormat = FILE_TYPE[file.mimetype]
        let uploadError = new Error("Invalid format image")
        if (isValidFormat) {
            uploadError = null
        }
        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const uniquefile = `${ file.fieldname }-${ Date.now() }${ path.extname(file.originalname) }`
        cb(null, uniquefile)
    }
})

export const upload = multer({ storage: storage })