const mongoose = require("mongoose")
const schema = mongoose.Schema
const questions = require("./questions.js")
const userInfo = require("./userModel.js")
const ans_schema = schema({
    isVerified: {
        type: Boolean,
        default: false,
    },
    answer: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    image: {
        type: schema.Types.Mixed
    },
    user_id: {
        type: schema.Types.ObjectId,
        ref: "user",
    },
    q_id: {
        type: schema.Types.ObjectId,
        ref: "question"
    }

}, {
    timestamps: true
})
const answers = mongoose.model("answer", ans_schema)
module.exports = answers
