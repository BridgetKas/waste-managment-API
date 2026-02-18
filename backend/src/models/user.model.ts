import mongoose from 'mongoose';
import { lowercase } from 'zod';
const { Schema,model } = mongoose;

const userSchema = new Schema({
  firstName: {
    type:String,
    required:[true , 'First name is required'],
    trim:true
  }, 
  lastName: {
    type:String,
    required:[true, 'Last name is required'],
    trim:true
  }, 
  email: {
    type:String,
    unique: true,
    validate: {
      validator: function(v:string) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: (props:any) => `${props.value} is not a valid email!`
    },
    required:[true, 'Email is required'],
    trim:true,
    lowercase:true
  },
  password: {
    type:String,
    required:[true, 'Password is required'],
    select:false
  },
  registrationNumber: {
    type:String,
    unique: true,
    required:[true, 'Registration Number is requred']
  },
  role: {
    type:String,
    required:true,
    enum: {
      values:['buyer', 'seller'],
      message:'{VALUE} is not a supported role'
    }, 
    default: 'buyer',
    
  } 
  
},{ timestamps: true ,
 
});


export   const User = model('User', userSchema);