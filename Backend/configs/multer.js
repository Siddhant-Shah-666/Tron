const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require("multer");

//  Configure Cloudinary with your credentials 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

//  Cloudinary Storage Engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'tron-bug-tracker', // Folder name in your Cloudinary account
    allowed_formats: ['jpeg', 'png', 'jpg'],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
  },
});

const upload = multer({ storage: storage });


module.exports = upload;




















// //multer configure
// const multer = require("multer");
// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"uploads/");//create uploads folder
//     },
//     filename:(req,file,cb)=>{
//         cb(null , Date.now() + "_" + file.originalname)
//     }
// })
// const upload = multer({storage});
// module.exports= upload;