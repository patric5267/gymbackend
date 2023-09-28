const express = require('express')
const router = express.Router()
const product = require('../models/product')


router.post('/create', async (req, res) => {
    try {
        const { name, images } = req.body
        console.log(req.body);
        if (!name || !images) {
            return res.json({ message: 'fill' })
        }
        else {
            const newproduct = await new product({ name: name, images: images })
            const saveproduct = await newproduct.save()
            if (saveproduct) {
                return res.json(saveproduct)
            }
        }
    } catch (error) {
        return res.json({ message: error })
    }
})
router.post('/add/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        console.log(req.body);
        const updateproduct = await product.updateOne({ _id: req.params.id }, { $addToSet: { images: req.body } })
        if (updateproduct) {
            return res.statusCode(200).json({ message: 'added' })
        }
    } catch (error) {
        return res.json({ message: error })
    }
})

router.post('/remove/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        console.log(req.body);
        const updateproduct = await product.updateOne({ _id: req.params.id }, { $pull: { images: { _id: '64dc61834cb8b6d13d95e3f3' } } })
        if (updateproduct) {
            return res.status(200).json({success:true , message:updateproduct})
        }
    } catch (error) {
        return res.json({ message: error })
    }
})
module.exports = router