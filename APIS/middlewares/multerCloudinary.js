const cloudinary = require("cloudinary").v2;
const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")

//configure cloudinary
cloudinary.config({
    cloud_name: 'drdbrthgk',
    api_key: '533191875719325',
    api_secret: 'gIdlAAm6v1kr08CGpj7nELZ9btU'
})


//configure multjer-storage-cloudinary
const clStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: "vnr2021",
            public_id: file.fieldname + '-' + Date.now()
        }
    }
})


//configure multer
const multerObj = multer({ storage: clStorage })

module.exports=multerObj;