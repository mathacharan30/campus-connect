const mongoose=require('mongoose')
const schema=mongoose.Schema
const h_schema=schema({
    user_id: { type: schema.Types.ObjectId, ref: 'user' },
    name:String,
    date:String,
    link:String
}, { timestamps: true })
const hackathon=mongoose.model("hackathon",h_schema)
module.exports=hackathon