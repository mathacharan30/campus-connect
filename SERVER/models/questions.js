const mongoose=require("mongoose")
const schema=mongoose.Schema
const ans_schema=require("./answers")

const q_schema=schema({
    user_id: { type: schema.Types.ObjectId, ref: 'user' },
    isanswered:{
        type:Boolean,
        default:false
    },
    username:{
        type:String,
        require
    },
    question:{
        type:String,
        require
    },
    answer:{
        type:schema.Types.ObjectId,
        ref:"answer",
        max:1
    },
    subject:{
        type:String,

    },
    image:{
        type:String
    }
},
    {
        timestamps:true,
    }
)
const q_model=mongoose.model('question',q_schema)
module.exports=q_model