import mongoose, { Mongoose } from'mongoose';

// Define the product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },

  image:{
    type:String,
    default:''
  },
  images :[{
  type: String
  }],
  description: {
    type: String,
    required: true
  },
  richDescription:{
    type: String,
    default: ""
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Category",
    required: true
  },
  countInStock:{
    type: Number,
    required: true,
    min:0
  },
  rating:[{
    star: Number,
    postedBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

productSchema.virtual('id').get(function(){
  return this._id .toHexString();
});

productSchema.set(('toJSON'),{
   virtuals :true
});
// Create the Product model based on the product schema
export const Product = mongoose.model('Product', productSchema);

