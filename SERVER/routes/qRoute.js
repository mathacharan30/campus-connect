const Question = require('../models/questions')
const user = require('../models/userModel')
const express = require('express')
const multer = require('multer')
const cloudinary = require('../utils/cloudinary')
const upload = multer({ storage: multer.memoryStorage() })

const routes = express.Router();
// index route
routes.get('/viewQns', async (req, res) => {
    try {
        const result = await Question.find()
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send({ message: 'Failed to fetch questions' })
    }
})
// view question
routes.get('/getQn/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await Question.findById(id)
        if (!result) return res.status(404).send({ message: 'Question not found' })
        res.status(200).send(result)
    } catch (e) {
        res.status(500).send({ message: 'Failed to fetch question' })
    }
})

// new route add a new question
routes.post('/postQn', upload.single('image'), async (req, res) => {
    try {
        const { question, subject, username, user_id } = req.body
        let imageUrl = ''
        if (req.file) {
            const uploaded = await cloudinary.uploader.upload_stream({ folder: 'campus_connect/questions' }, (error, result) => {
                if (error) throw error
            })
        }
        // cloudinary upload via promise to use buffer
        if (req.file) {
            imageUrl = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ folder: 'campus_connect/questions' }, (err, result) => {
                    if (err) return reject(err)
                    resolve(result.secure_url)
                })
                stream.end(req.file.buffer)
            })
        }
        const payload = { question, subject, username, user_id, image: imageUrl }
        const result = new Question(payload)
        await result.save()
        res.status(201).send(result)
    } catch (e) {
        res.status(400).send({ message: 'Failed to add question' })
    }
})

// update question
routes.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params
        const existing = await Question.findById(id)
        if (!existing) return res.status(404).send({ message: 'Question not found' })
        if (existing.isanswered) {
            return res.status(403).send({ message: 'Question cannot be edited after it has an answer' })
        }
        const updated = await Question.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        res.status(200).send(updated)
    } catch (e) {
        res.status(400).send({ message: 'Failed to update question' })
    }
})

// delete question
routes.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await Question.findByIdAndDelete(id)
        if (!deleted) return res.status(404).send({ message: 'Question not found' })
        res.status(200).send({ message: 'Question deleted successfully' })
    } catch (e) {
        res.status(400).send({ message: 'Failed to delete question' })
    }
})

module.exports = routes
