const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    rating: {
        type: Number,
        required: true
    },
    reviewPictures: [
        {
            img: {
                type: String
            }
        }
    ]
})


const productReviewSchema = new mongoose.Schema({
    product: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required: true,
        unique: true,
    },
    reviews:[reviewSchema]
})


const ProductReview = mongoose.model('productReview',productReviewSchema)

module.exports = ProductReview