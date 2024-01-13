import mongoose from 'mongoose';
import { Category } from '../model/category_model.js';
import {Product} from '../model/product_model.js';

// Create a new product
export const createProduct =    async(req, res) => {

const {catrgoryId} = req.Category;
 const fileName = req.file.filename;
 const basePath = `${req.protocol}://${req.get('host')}/public/upload/`;
  try {
  const category = await Category.findById(req.body.category)
  .then((val)=>console.log(val)).catch((err)=>console.log(err));
  if(!category) return res.status(400).json({message:"invalid category"});
    const product = new Product({ 
      name: req.body.name, 
      price: req.body.price,
      description: req.body.description, 
      richDescription: req.body.richDescription,
      image:`${basePath}${fileName}`,
      images:req.body.images,
      category: req.body.category,
      countInStock:  req.body.countInStock });

    await product.save().then(()=>console.log("created")).catch((err)=>console.log(err));
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a new product' });
  }

};

// Get all products
export const getAllProducts =  async (req, res) => {

 
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
};

// Get a single product by ID
export const getProduct =  async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({message:"invalid product id"});

  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
     return res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the product' });
  }
};

// Update a product
export const updateProduct =  async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({message:"invalid product id"});

  try {
    const category = await Category.findById(req.body.category);
      if(!category) return res.status(400).json({message:"invalid category"});

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, 
        price: req.body.price,
        description: req.body.description, 
        richDescription: req.body.richDescription,
        image:req.body.image,
        images:req.body.images,
        category: req.body.category,
        countInStock:  req.body.countInStock },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the product' });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the product' });
  }
};


// Get acategory products 
export const getCategoryProducts =  async (req, res) => {
  try {
    const products = await Product.find({}).where('category').equals(req.params.id);
    if (!products) {
      return res.status(404).json({ error: 'Products not found' });
    }
     return res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the products' });
  }
};


export const uploadImages =  async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
     return res.status(400).json({message:"invalid product id"});
 
  const files = req.files;
  const basePath = `${req.protocol}://${req.get('host')}/public/upload/`;
  let imagesPath = [];
  if(files){
    files.map(file=>{
      imagesPath.push(`${basePath}${file.filename}`);
    })
  }
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { 
        images:imagesPath,
         },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the product' });
  }
};
