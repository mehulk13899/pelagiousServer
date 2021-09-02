const express=require('express')
const router=express.Router()
const {requireSignIn, userMiddleware, adminMiddleware}=require('../common-middleware')
const {addProductReview,deleteProductReview} = require('../controller/review')

//for add review and update review(for update give id in payload)
router.post('/addReview',requireSignIn,userMiddleware,addProductReview)

router.post('/deleteReview',requireSignIn,userMiddleware,deleteProductReview)




module.exports=router