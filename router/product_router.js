import express from "express";
import { createProduct, deleteProduct, getAllProducts, getCategoryProducts, getProduct, updateProduct, uploadImages } from "../controller/product_controller.js";

const router = express.Router();
import multer from "multer";
import { authMiddleware, isAdmin } from "../middelware/auth.js";
import { getCategory } from "../controller/category_controller.js";

const FIND_TYPE_MAP ={
  "image/png":"png",
  "image/jpeg":"jpeg",
  "image/jpg":"jpg",
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FIND_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");
    if(isValid){
      uploadError = null;
    }
    cb(uploadError, 'public/upload')
  },
  filename: function (req, file, cb) {
    const extension = FIND_TYPE_MAP[file.mimetype];
 const fileName = file.originalname.split(' ').join('-');
    cb(null, `${fileName }-${Date.now()}.${extension}`);
  }
});

const uploadOptions = multer({ storage: storage });

router.post('/',authMiddleware,isAdmin,uploadOptions.single('image'),createProduct);
router.get('/',authMiddleware,getAllProducts);
router.get('/:id',authMiddleware,getProduct);
router.put('/:id',authMiddleware,isAdmin,updateProduct);
router.put('/product-images/:id',authMiddleware,isAdmin,uploadOptions.array('images',10),uploadImages);
router.delete('/:id',authMiddleware,isAdmin,deleteProduct );
router.get('/getCategoryProducts/:id',authMiddleware,getCategoryProducts);

export default router;
