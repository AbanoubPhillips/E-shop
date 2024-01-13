
import  {Order}  from '../model/orders_model.js';

// Create a new order
export const createOrder =  async (req, res) => {
  try {
    const { user, orderItems, shippingAddress, totalPrice } = req.body;
    const order = new Order({ user, orderItems, shippingAddress, totalPrice });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a new order' });
  }
};

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
};

// Get a single order by ID
export const getOrder =async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the order' });
  }
};

// Delete an order
export const deleteOrder =async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the order' });
  }
};
