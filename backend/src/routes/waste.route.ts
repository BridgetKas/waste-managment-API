import express, { Router } from 'express';
import { uploadWaste , updateWasteListing,deleteWasteListing } from '../controllers/waste.controller.ts';
import { upload } from '../config/cloudinary.ts';
import { authMiddleware } from '../middleware/auth.middleware.ts';
import { roleMiddleware } from '../middleware/role.middleware.ts';
import { validate } from '../middleware/user.middleware.ts';
import { wasteSchema } from '../schema/schema.ts';

const router: Router = express.Router();


// 'images' -> to be forwarded for the form name
router.post('/upload', authMiddleware,roleMiddleware('seller'), upload.array('images', 5),validate(wasteSchema), uploadWaste);
router.patch('/:id', authMiddleware, roleMiddleware('seller'), upload.array('images', 5), updateWasteListing);
router.delete('/:id', authMiddleware, roleMiddleware('seller'), deleteWasteListing);


export default router;