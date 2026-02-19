import { type Request, type Response } from 'express';
import { Waste } from '../models/waste.model.ts';
import { v2 as cloudinary } from 'cloudinary';
import * as WasteService from '../services/waste.service.ts';


export const uploadWaste = async (req: Request, res: Response) => {
  try {
    const sellerId = (req.user as any).id;

    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res.status(400).json({ success: false, message: "At least one image is required" });
    }

    const imageUrls = (req.files as Express.Multer.File[]).map(file => file.path);

    const wasteData = { 
        ...req.body, 
       seller: req.user?.id,
        images: imageUrls 
    };

    const newListing = await WasteService.createWaste(wasteData, sellerId);

    return res.status(201).json({
      success: true,
      message: 'Waste list created successfully',
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};


export const updateWasteListing = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const waste = await Waste.findById(id);
    if (!waste) return res.status(404).json({ message: "Listing not found" });

    
    if (waste.status === 'sold') {
      return res.status(400).json({ message: "Sold items cannot be edited." });
    }

    
    if (waste.seller.toString() !== req.user?.id) {
      return res.status(403).json({ message: "Not authorized to edit this listing" });
    }

    if (req.files && (req.files as any[]).length > 0) {
        req.body.images = (req.files as any[]).map(file => file.path);
    }

    const updatedWaste = await Waste.findByIdAndUpdate(id, req.body, { 
        new: true, 
        runValidators: true 
    });

    res.status(200).json({ message: "Update successful" });

  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
};




export const deleteWasteListing = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const waste = await Waste.findById(id);

    if (!waste) return res.status(404).json({ message: "Listing not found" });

    if (waste.seller.toString() !== req.user?.id) {
      return res.status(403).json({ message: "Not authorized to delete this" });
    }

    //  Delete images from Cloudinary
    if (waste.images && waste.images.length > 0) {
      const deletePromises = waste.images.map((url) => {
        const parts = url.split('/');
        const fileName = parts.pop()?.split('.')[0]; 
        const folder = parts.pop(); 
        const publicId = `${folder}/${fileName}`;
        
        return cloudinary.uploader.destroy(publicId);
      });

      await Promise.all(deletePromises);
    }

    await Waste.findByIdAndDelete(id);

    res.status(200).json({ message: "Listing and images deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error });
  }
};