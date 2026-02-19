import { Waste } from '../models/waste.model.ts';
import { type IWaste } from '../interfaces/waste.interface.ts';

export const createWaste = async (wasteData: Partial<IWaste>, sellerId: string) => {
  const waste = new Waste({
    ...wasteData,
    seller: sellerId, 
    status: 'available'
  });

  return await waste.save();
};

export const getWasteListings = async (category?: string) => {
  const filter: any = { status: 'available' };

  if (category) {
    filter.category = category;
  }
  
  return await Waste.find(filter)
    .populate('seller', 'firstName lastName email')
    .sort({ createdAt: -1 }); 
};