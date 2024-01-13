import mongoose  from "mongoose";
// Define the OrderItem schema
const orderItemSchema = new mongoose.Schema({
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  });
  
  // Create the OrderItem model
  export const OrderItem = mongoose.model('OrderItem', orderItemSchema);
  