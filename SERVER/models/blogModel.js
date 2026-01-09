const mongoose=require("mongoose")
const user = require('../models/userModel.js')

const schema=mongoose.Schema

const b_schema=schema({
    user_id: { type: schema.Types.ObjectId, ref: 'user' },
    name:String,
    year:String,
    company:String,
    salary:Number,
    content:String,
    image:String,
    headline:String

}, { timestamps: true })
module.exports=mongoose.model('blog',b_schema)