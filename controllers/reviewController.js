
const Review = require('./../models/reviewModel')
const catchAsync = require('../utils/catchAsync');



exports.createReview = catchAsync(async(res,req,next)=>{
    
    const newReview =await Review.create(req.body)

    res.status(200).json({
        success:true,
        data: {
            Review:newReview
        }
    })
});

// getting all reviews

exports.getAllRevieww= catchAsync(async(res,req,next)=>{
    const reviews =await Review.find();
    res.status(200).json({
        success:true,
        results: reviews.length,
        data :{
            reviews
        }
    })
})