import { Schema, model } from 'mongoose';

const wasteSchema = new Schema({
  title: { type: String, required: true, trim: true }, 
  description: { type: String, required: true },       
  category: { 
    type: String, 
    required: true, 
    enum: ['Plastic', 'Metal', 'Paper', 'Electronic', 'Other'] 
  },
  
  quality: { 
    type: String, 
    required: true, 
    enum: ['Sorted/Clean', 'Unsorted/Mixed', 'Industrial Grade'], 
    default: 'Unsorted/Mixed'
  },
  qualityNotes: { 
    type: String, 
    trim: true 
  },
  status: {
    type: String,
    enum: ['available', 'sold','pending'],
    default: 'available'
  },

  images: { 
    type: [String], 
    validate: [arrayLimit, '{PATH} exceeds the limit of 5'] 
  },
  listingType: { 
    type: String, 
    required: true, 
    enum: ['fixed', 'bidding'] 
  },
  price: { 
    type: Number, 
    required: function() { return this.listingType === 'fixed'; } 
  },
  unit: { 
    type: String, 
    required: function() { return this.listingType === 'fixed'; } ,
    enum:['kg', 'tonnes', 'pieces']
  },
  seller: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  },
  location: {
    type: {
      type: String, 
      enum: ['Point'], 
      required: true,
      default: 'Point'
    },
    coordinates: {
      type: [Number], 
      required: true
    },
    address: { type: String, trim: true }
  },
}, { timestamps: true });

wasteSchema.index({ location: '2dsphere' });

function arrayLimit(val: string[]) {
  return val.length <= 5;
}

export const Waste = model('Waste', wasteSchema);


