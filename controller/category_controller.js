
import {Category}  from '../model/category_model.js';

// Create a new category
export const createCategory =  async (req, res) => {
  try {
    const cat= req.body.name;
  const  exist = await Category.findOne({name:cat});
  if(exist) return res.status(400).json({message:"Category is exist"});
  } catch (error) {
    res.status(500).json({ error: error });
  }
  try {
    const { name, description, image } = req.body;
    const category = new Category({ 
      name:name,
      description: description,
       images:image });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a new category' });
  }
};

// Get all categories
export const getAllCategory =   async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve categories' });
  }
};

// Get a single category by ID
export const getCategory =   async (req, res,next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    req.category = category;
    res.json(category);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the category' });
  }
};

// Update a category
export const updateCategory =   async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,

      {name:name,
       description: description,
       images:image},

      { new: true }
    );
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the category' });
  }
};

// Delete a category
export const deleteCategory =   async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the category' });
  }
};

