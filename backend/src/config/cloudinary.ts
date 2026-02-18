import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv'

dotenv.config({quiet:true})

const cloudName = process.env.CLOUDINARY_NAME
const apiKey = process.env.CLOUDINARY_KEY
const apiSecret = process.env.CLOUDINARY_SECRET

cloudinary.config({
  cloud_name:cloudName as string ,
  api_key: apiKey as string,
  api_secret: apiSecret as string,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'waste-materials',
      allowed_formats: ['jpg', 'png', 'jpeg'],
    };
  },
});

export const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});