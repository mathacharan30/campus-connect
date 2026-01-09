const express = require("express");
const router = express.Router();
const user = require('../models/userModel');
const bycrypt = require("bcryptjs");

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password, USN, semester, userRole } = req.body;
        // basic presence checks
        if (!username || !email || !password || !userRole) {
            return res.status(400).json({ message: 'username, email, password and userRole are required' });
        }
        if (userRole === 'student') {
            if (!USN || semester === undefined || semester === null) {
                return res.status(400).json({ message: 'USN and semester are required for students' });
            }
        }

        // prevent duplicates by username/email
        const existing = await user.findOne({ $or: [{ email }, { username }] });
        if (existing) {
            return res.status(409).json({ message: 'Email or username already exists' });
        }

        const payload = {
            username,
            email,
            password,
            userRole,
            // only include USN/semester for students
            ...(userRole === 'student' ? { USN, semester } : {})
        };
        const newUser = new user(payload);
        await newUser.save();
        return res.status(201).json({ message: 'user registered successfully' });
    } catch (error) {
        // surface meaningful error info
        return res.status(400).json({ message: error?.message || 'Signup failed', code: error?.code, errors: error?.errors });
    }
});

router.post('/login', async (req, res) => {
    let token;
    const { username, password } = req.body;
    const dbuser = await user.findOne({ username: username });
    if (dbuser) {
        const result = await bycrypt.compare(password, dbuser.password);
        if (result) {
            token = await dbuser.generateAuth();
            res.cookie("jwtToken", token, {
                expires: new Date(Date.now() + 28980000),
                httpOnly: true,
            });
            const user={
                _id:dbuser._id,
                name:dbuser.username,
                userRole:dbuser.userRole,
            }
            res.send(user);
        } else {
            res.status(400).send("incorrect password");
        }
    } else {
        res.status(400).send("user not found");
    }
})


router.get('/logout',(req,res)=>{
    res.cookie("jwtToken", "", {
        expires: new Date(Date.now() + 5),
    });
    res.send("logout successful");
})



module.exports = router