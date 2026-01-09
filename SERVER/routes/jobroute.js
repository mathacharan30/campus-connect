express = require('express')
const router = express.Router()
const user = require('../models/userModel.js')
const job = require('../models/jobsModel.js')
// view 
router.get('/getJobs', async (req, res) => {
    try {
        const result = await job.find()
        res.status(200).send(result)
    } catch (e) {
        res.status(500).send({ message: 'Failed to fetch jobs' })
    }
})
// get one
router.get('/getJob/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await job.findById(id)
        if (!result) return res.status(404).send({ message: 'Job not found' })
        res.status(200).send(result)
    } catch (e) {
        res.status(500).send({ message: 'Failed to fetch job' })
    }
})
// add 
router.post('/new', async (req, res) => {
    try {
        const result = new job(req.body)
        await result.save()
        res.status(201).send(result)
    } catch (e) {
        res.status(400).send({ message: 'Failed to add job' })
    }
})
// update
router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params
        const updated = await job.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        if (!updated) return res.status(404).send({ message: 'Job not found' })
        res.status(200).send(updated)
    } catch (e) {
        res.status(400).send({ message: 'Failed to update job' })
    }
})
// delete (body)
router.delete('/delete', async (req, res) => {
    try {
        await job.findByIdAndDelete(req.body.job_id)
        res.status(200).send({ message: 'job info deleted successfully' })
    } catch (e) {
        res.status(400).send({ message: 'Failed to delete job' })
    }
})
// delete by id
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await job.findByIdAndDelete(id)
        if (!deleted) return res.status(404).send({ message: 'Job not found' })
        res.status(200).send({ message: 'job info deleted successfully' })
    } catch (e) {
        res.status(400).send({ message: 'Failed to delete job' })
    }
})
module.exports = router