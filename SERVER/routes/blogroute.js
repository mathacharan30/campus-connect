const express = require("express")
const blog = require('../models/blogModel')
const router = express.Router()
const multer = require('multer')
const cloudinary = require('../utils/cloudinary')
const upload = multer({ storage: multer.memoryStorage() })
// index route
router.get('/viewBlogs', async (req, res) => {
    try {
        const result = await blog.find()
        res.status(200).send(result)
    } catch (e) {
        res.status(500).send({ message: 'Failed to fetch blogs' })
    }
})
// show route
router.get('/getBlog/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await blog.findById(id)
        if (!result) return res.status(404).send({ message: 'Blog not found' })
        res.status(200).send(result)
    } catch (e) {
        res.status(500).send({ message: 'Failed to fetch blog' })
    }
})
// new route
router.post('/newBlog', upload.single('image'), async (req, res) => {
    try {
        const { name, year, company, salary, content, headline, user_id } = req.body
        let imageUrl = ''
        if (req.file) {
            imageUrl = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ folder: 'campus_connect/blogs' }, (err, result) => {
                    if (err) return reject(err)
                    resolve(result.secure_url)
                })
                stream.end(req.file.buffer)
            })
        }
        const payload = { name, year, company, salary, content, headline, image: imageUrl, user_id }
        const newblog = new blog(payload)
        await newblog.save()
        res.status(201).send(newblog)
    } catch (e) {
        res.status(400).send({ message: 'Failed to add blog' })
    }
})
// update route
router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params
        const updated = await blog.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        if (!updated) return res.status(404).send({ message: 'Blog not found' })
        res.status(200).send(updated)
    } catch (e) {
        res.status(400).send({ message: 'Failed to update blog' })
    }
})
// delete route (body._id) kept for backward compatibility
router.delete('/delete', async (req, res) => {
    try {
        await blog.findByIdAndDelete(req.body._id)
        res.status(200).send({ message: 'blog deleted successfully' })
    } catch (e) {
        res.status(400).send({ message: 'Failed to delete blog' })
    }
})
// RESTful delete by id
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await blog.findByIdAndDelete(id)
        if (!deleted) return res.status(404).send({ message: 'Blog not found' })
        res.status(200).send({ message: 'blog deleted successfully' })
    } catch (e) {
        res.status(400).send({ message: 'Failed to delete blog' })
    }
})
module.exports = router