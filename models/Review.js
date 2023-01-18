
const mongoose =require('mongoose')

const reviewSchema= new mongoose.Schema(
    {
        review:{
            type:String,
            required: true
        },
        rating: {
            type:Number,
            min:1,
            max:5
        },
        createdAt:{
            type:Date,
            default: Date.now()
        },
        post: {
            type:mongoose.Schema.ObjectId,
            ref: 'Post',
            required:[true, 'Review must have a post']
        },
        user :{
            type:mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true,'Review must have a user']
        }
    },
    {
        toJSON:{virtuals:true},
        toObject:{virtuals: true}
    }
);

reviewSchema.pre(/^find/,function(next){
    this.populate({
        path: 'user',
        select: 'name photo'
    })
})


const Review =mongoose.model('Review',reviewSchema);
module.exports= Review