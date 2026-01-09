const mongoose = require('mongoose')
const schema = mongoose.Schema
const user = require('./userModel.js')
const j_schema = schema({
    user_id: {
        type: schema.Types.ObjectId,
        ref: "user",
    },
    job_role: {
        type: String
    },
    job_link: {
        type: String
    }
},
    {
        timestamps: true
    })
job = mongoose.model('job', j_schema)
module.exports = job