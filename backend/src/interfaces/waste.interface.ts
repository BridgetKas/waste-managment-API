import { Document, Types } from 'mongoose';

export interface IWaste extends Document {
  title: string;
  description: string;
  category: 'Plastic' | 'Metal' | 'Paper' | 'Electronic' | 'Other';
  quality: 'Sorted/Clean' | 'Unsorted/Mixed' | 'Industrial Grade';
  quantity: number;
  qualityNotes?: string;
  unit: 'kg' | 'tonnes' | 'pieces';
  status: 'available' | 'sold' | 'pending';
  location: {
    type: 'Point';
    coordinates: [number, number]; 
    address?: string; 
  };

  images: string[];
  listingType: 'fixed' | 'bidding';
  price: number;
  seller: Types.ObjectId;
}