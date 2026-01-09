const mongoose = require('mongoose')
const schema = mongoose.Schema
const bycrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const userschema = schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    USN: {
        type: String,
        required: function () { return this.userRole === 'student'; }
    },
    semester: {
        type: Number,
        max: 8,
        min: 1,
        required: function () { return this.userRole === 'student'; }
    },
    userRole: {
        type: String,
        required: true
    }


}, {
    timestamps: true,
})

userschema.pre('save', async function (next) {
    const salt = await bycrypt.genSalt();
    this.password = await bycrypt.hash(this.password, salt);
    next();
})

userschema.methods.generateAuth = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, "mysecretkey");
        return token;
    } catch (err) {
        console.log(err);
    }
}

const user = mongoose.model('user', userschema)
module.exports = user;

