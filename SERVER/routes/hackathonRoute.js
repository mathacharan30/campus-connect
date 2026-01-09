const express = require("express")
const routes = express.Router()
const hackathon = require('../models/hackathon.js')
// get hackathons
routes.get('/getHackathons', async (req, res) => {
    try {
        const result = await hackathon.find()
        res.status(200).send(result)
    } catch (e) {
        res.status(500).send({ message: 'Failed to fetch hackathons' })
    }
})
// get one hackathon
routes.get('/getHackathon/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await hackathon.findById(id)
        if (!result) return res.status(404).send({ message: 'Hackathon not found' })
        res.status(200).send(result)
    } catch (e) {
        res.status(500).send({ message: 'Failed to fetch hackathon' })
    }
})
// add hackathon
routes.post('/addHackathon', async (req, res) => {
    try {
        const result = new hackathon(req.body)
        await result.save()
        res.status(201).send(result)
    } catch (e) {
        res.status(400).send({ message: 'Failed to add hackathon' })
    }
})
// update hackathon
routes.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params
        const updated = await hackathon.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        if (!updated) return res.status(404).send({ message: 'Hackathon not found' })
        res.status(200).send(updated)
    } catch (e) {
        res.status(400).send({ message: 'Failed to update hackathon' })
    }
})
// delete hackathon
routes.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await hackathon.findByIdAndDelete(id)
        if (!deleted) return res.status(404).send({ message: 'Hackathon not found' })
        res.status(200).send({ message: 'Hackathon deleted successfully' })
    } catch (e) {
        res.status(400).send({ message: 'Failed to delete hackathon' })
    }
})
module.exports = routes