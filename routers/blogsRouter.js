
const express=require("express");
const router=express.Router();
const isAuth = require('./../middleware/authMiddleware');
const postControllers=require("../Controllers/blogControllers")

//api to for  blogs

router.route('/')
.get(isAuth.Protected, postControllers.getAllBlogs)
.post(isAuth.Protected, isAuth.Restrict('admin', 'vc-admin'),postControllers.createBlog);

router
  .route('/:id')
  .delete(isAuth.Protected, isAuth.Restrict('admin', 'vc-admin'), postControllers.deletePost)
  .patch(isAuth.Protected, isAuth.Restrict('admin', 'vc-admin'),postControllers.UpdatePost)
  .get(postControllers.getPostById);

module.exports = router;


module.exports=router;