
// {
//     payload:{
//         productId:productId,
//         review:{
//             name,
//             description,
//             email,
//             rating
//             reviewPictures
//         }
//     }
// }

const Product = require("../models/product");
const ProductReview = require("../models/review");


module.exports.addProductReview = async (req, res) => {
    const { id, productId, review } = req.body.payload;
    if (req.body.payload) {
        if (id) {
            let updatedReview = review;
            updatedReview.user = req.user._id;
            await ProductReview.findOneAndUpdate(
                { product: productId, "reviews._id": id },
                {
                    $set: {
                        "reviews.$": updatedReview
                    }
                }, { new: true,upsert:true })
                .exec((error, review) => {
                    if (error) {
                        return res.status(400).send({ error: error });
                    }
                    if (review) {
                        return res.status(201).send({ review: review })
                    }
                })

        } else {

            await ProductReview.findOneAndUpdate({ product: productId }, {
                $push: {
                    "reviews": { ...review, user: req.user._id }
                }
            }, { new: true, upsert: true })
                .exec((error, review) => {
                    if (error) {
                        return res.status(400).send({ error: error });
                    }
                    if (review) {
                        return res.status(201).send({ review: review })
                    }
                })

        }


    }
}




module.exports.deleteProductReview = async (req, res) => {
    const { productId, id } = req.body.payload

    await ProductReview.findOneAndUpdate({ product: productId, "reviews._id": id },
        {
            $unset: {
                "reviews.$":""
            }
        }, { new: true })
        .exec((error, review) => {
            if (error) {
                return res.status(400).send({ error: error });
            }
            if (review) {
                return res.status(201).send({ review: review })
            }
        })



}
