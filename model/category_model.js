import mongoose from'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type:String,
    default:''
  },
  description: {
    type:String,
    default:''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
categorySchema.virtual('id').get(function(){
  return this._id .toHexString();
});

categorySchema.set(('toJSON'),{
   virtuals :true
});
export const Category = mongoose.model('Category', categorySchema);

