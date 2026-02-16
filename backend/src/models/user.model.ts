import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type:String,
    required:[true , 'First name is required']
  }, 
  lastName: {
    type:String,
    required:true
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
    required:true
  },
  password: {
    type:String,
    required:true
  },
  registrationNumber: {
    type:Number,
    unique: true,
    required:true
  },
  role: {
    type:String,
    required:true
  } 
  
});


export default  mongoose.model('User', userSchema);