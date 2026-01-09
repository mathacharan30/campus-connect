const express = require('express')
const routes = express.Router()
const notes = require('../models/notesModel')

// create
routes.post('/uploadNotes', async (req, res) => {
    try {
        const result = new notes(req.body)
        await result.save()
        res.status(201).send(result)
    } catch (e) {
        res.status(400).send({ message: 'Failed to add notes' })
    }
})

// read all
routes.get('/getNotes', async (req, res) => {
    try {
        const result = await notes.find()
        res.status(200).send(result)
    } catch (e) {
        res.status(500).send({ message: 'Failed to fetch notes' })
    }
})

// read one
routes.get('/getNote/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await notes.findById(id)
        if (!result) return res.status(404).send({ message: 'Note not found' })
        res.status(200).send(result)
    } catch (e) {
        res.status(500).send({ message: 'Failed to fetch note' })
    }
})

// update
routes.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params
        const updated = await notes.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        if (!updated) return res.status(404).send({ message: 'Note not found' })
        res.status(200).send(updated)
    } catch (e) {
        res.status(400).send({ message: 'Failed to update note' })
    }
})

// delete
routes.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await notes.findByIdAndDelete(id)
        if (!deleted) return res.status(404).send({ message: 'Note not found' })
        res.status(200).send({ message: 'Note deleted successfully' })
    } catch (e) {
        res.status(400).send({ message: 'Failed to delete note' })
    }
})

module.exports = routes