
const express =require('express');
const reviewController =require('./../controllers/reviewController');
const isAuth = require('../middleware/authMiddleware');
const router =express.Router();

router.route('/')
.get(isAuth.Protect,reviewController.getAllRevieww)
.post(isAuth.Protect,isAuth.Restricted('user'),reviewController.createReview)

module.exports= router