const mongoose = require('mongoose')
const schema = mongoose.Schema
const notesSchema = schema({
    user_id: { type: schema.Types.ObjectId, ref: 'user' },
    subject: {
        type: String
    },
    chapter: {
        type: String
    },
    link: {
        type: String
    },
    type: {
        type: String
    },
    sem: {
        type: Number
    }
},
    {
        timestamps: true
    })
const notes = mongoose.model('note', notesSchema)
module.exports = notes