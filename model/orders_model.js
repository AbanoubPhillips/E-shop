import mongoose from'mongoose';
// Define the Order schema
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrderItem',
      required: true
    }
  ],
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status:{
    type:String,
    required: true,
    default:"pending",
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Order model
export const Order = mongoose.model('Order', orderSchema);
