const answer = require('../models/answers.js')
const express = require('express')
const routes = express.Router()
const question = require('../models/questions.js')
const user = require('../models/userModel.js')
const multer = require('multer')
const cloudinary = require('../utils/cloudinary')
const upload = multer({ storage: multer.memoryStorage() })

// create answer
routes.post('/new', upload.single('image'), async (req, res) => {
    try {
        const { answer: ansText, user_id, q_id, username } = req.body
        let imageUrl = ''
        if (req.file) {
            imageUrl = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ folder: 'campus_connect/answers' }, (err, result) => {
                    if (err) return reject(err)
                    resolve(result.secure_url)
                })
                stream.end(req.file.buffer)
            })
        }
        const payload = { answer: ansText, user_id, q_id, username, image: imageUrl }
        const result = new answer(payload)
        await result.save()
        await question.findByIdAndUpdate(q_id, {
            answer: result._id,
            isanswered: true
        })
        res.status(201).send(result)
    } catch (e) {
        res.status(400).send({ message: 'Failed to post answer' })
    }
})

// view route by question id (assumes single answer per question)
routes.get('/getAns/:id', async (req, res) => {
    try {
        const { id } = req.params
        // Populate the related question so clients can access its image and other fields
        const result = await answer
            .findOne({ q_id: id })
            .populate('q_id', 'image username question subject')

        if (!result) return res.status(404).send({ message: 'Answer not found' })

        // Send answer doc plus a nested question object for convenience
        const obj = result.toObject()
        const payload = {
            ...obj,
            question: obj.q_id
                ? {
                    _id: obj.q_id._id,
                    image: obj.q_id.image,
                    username: obj.q_id.username,
                    question: obj.q_id.question,
                    subject: obj.q_id.subject,
                }
                : null,
        }
        res.status(200).send(payload)
    } catch (e) {
        res.status(500).send({ message: 'Failed to fetch answer' })
    }
})

// update answer by question id (single answer model)
routes.put('/update/:qid', async (req, res) => {
    try {
        const { qid } = req.params
        const updated = await answer.findOneAndUpdate({ q_id: qid }, req.body, { new: true, runValidators: true })
        if (!updated) return res.status(404).send({ message: 'Answer not found' })
        res.status(200).send(updated)
    } catch (e) {
        res.status(400).send({ message: 'Failed to update answer' })
    }
})

// delete answer (body contains q_id, ans_id) – keeping for backward compatibility
routes.delete('/delete', async (req, res) => {
    try {
        const { q_id, ans_id } = req.body
        const deleted = await answer.findByIdAndDelete(ans_id)
        if (deleted) {
            await question.findByIdAndUpdate(q_id, { answer: null, isanswered: false })
        }
        res.status(200).send({ message: 'Deletion successful' })
    } catch (e) {
        res.status(400).send({ message: 'Failed to delete answer' })
    }
})

// delete answer by answer id (RESTful)
routes.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        const doc = await answer.findById(id)
        if (!doc) return res.status(404).send({ message: 'Answer not found' })
        await answer.findByIdAndDelete(id)
        if (doc.q_id) {
            await question.findByIdAndUpdate(doc.q_id, { answer: null, isanswered: false })
        }
        res.status(200).send({ message: 'Deletion successful' })
    } catch (e) {
        res.status(400).send({ message: 'Failed to delete answer' })
    }
})

routes.post('/isVerified/:id', async (req, res) => {
    try {
        const { id } = req.params
        await answer.findOneAndUpdate({ q_id: id }, {
            isVerified: true
        })
        res.status(200).send({ message: 'verified' })
    } catch (e) {
        res.status(400).send({ message: 'Failed to verify' })
    }
})

module.exports = routes