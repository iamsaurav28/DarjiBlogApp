import express  from "express";
import AuthController from "../controllers/authController.js";
import BlogController from "../controllers/blogController.js";
import CategoryController from "../controllers/categoryController.js";
import checkIsUserAuthenticated from "../middlewares/authMiddleware.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const router = express.Router();
router.post("/user/register", AuthController.userRegisteration);
router.post("/user/login", AuthController.userLogin);

//protected routes
router.get("/get/allblogs" , checkIsUserAuthenticated, BlogController.getAllBlogs)
router.post("/add/blog",upload.single("thumbnail") , checkIsUserAuthenticated, BlogController.addNewBlog)
router.get("/get/blog/:id", checkIsUserAuthenticated,  BlogController.getSingleBlog)
router.put('/update/blog/:id', upload.single('thumbnail'), checkIsUserAuthenticated, BlogController.updateBlog);
router.delete('/blog/:id', checkIsUserAuthenticated, BlogController.deleteBlog); 
router.delete('/delete/blog/:id', checkIsUserAuthenticated, BlogController.deleteBlog);

router.get('/get/categories' , checkIsUserAuthenticated, CategoryController.getAllCategories)
router.post('/add/category' , checkIsUserAuthenticated, CategoryController.addNewCategory)
router.delete('/category/:id', checkIsUserAuthenticated, CategoryController.deleteCategory); 

export default router;






