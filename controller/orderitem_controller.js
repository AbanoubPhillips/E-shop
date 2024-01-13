
import { OrderItem } from '../model/orderitem_model.js';

// Create a new order item
export const createOrderItem =  async (req, res) => {
  try {
    const { product, quantity, price } = req.body;
    const orderItem = new OrderItem({ product, quantity, price });
    await orderItem.save();
    
    res.status(201).json(orderItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a new order item' });
  }
};

// Get all order items
export const getAllOrderItem = async (req, res) => {
  try {
    const orderItems = await OrderItem.find();
    res.json(orderItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve order items' });
  }
};

// Get a single order item by ID
export const getOrderItem = async (req, res) => {
  try {
    const orderItem = await OrderItem.findById(req.params.id);
    if (!orderItem) {
      return res.status(404).json({ error: 'Order item not found' });
    }
    res.json(orderItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the order item' });
  }
};

// Delete an order item
export const deleteOrderItem = async (req, res) => {
  try {
    const orderItem = await OrderItem.findByIdAndDelete(req.params.id);
    if (!orderItem) {
      return res.status(404).json({ error: 'Order item not found' });
    }
    res.json({ message: 'Order item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the order item' });
  }
};

